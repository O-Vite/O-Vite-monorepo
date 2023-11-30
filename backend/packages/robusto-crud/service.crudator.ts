import { dataSource } from 'src/services/database/database.service';
import { BaseEntityDb } from './baseEntityDb.crudator';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  In,
  ObjectType,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { A, D } from '@mobily/ts-belt';
import {
  TObjectValueOperatorWhere,
  TPagination,
  assertListWhere,
  buildWhereArray,
} from './where.crudator';

type TSettingCrudator<
  TEntity extends BaseEntityDb,
  TInsertDto extends DeepPartial<TEntity>,
  UpdateDto extends DeepPartial<TEntity>,
  TSelectDto extends DeepPartial<TEntity>,
> = {
  entityDB: ObjectType<TEntity>;
  selectKeys: Array<keyof TSelectDto>;
  selectDto: TSelectDto;
  insertDto: TInsertDto;
  updateDto: UpdateDto;
  wherePrefilter: TObjectValueOperatorWhere<TEntity>[];
};

export class Crudator<
  T extends BaseEntityDb,
  InsertDto extends DeepPartial<T>,
  UpdateDto extends DeepPartial<T>,
  TSelectDto extends DeepPartial<T>,
> {
  private EM = dataSource.manager;
  private preFilterBuilded = buildWhereArray(this.SC.wherePrefilter);
  constructor(
    private readonly SC: TSettingCrudator<T, InsertDto, UpdateDto, TSelectDto>,
  ) {}

  async fetchAll(
    filter: string = '',
    paginate: string = '',
    select: Array<keyof TSelectDto> = this.SC.selectKeys,
  ): Promise<TSelectDto[]> {
    const filterParsed =
      filter !== ''
        ? (JSON.parse(filter) as TObjectValueOperatorWhere<T>[])
        : [];
    const paginateParsed =
      paginate !== '' ? (JSON.parse(paginate) as TPagination) : null;
    assertListWhere(filterParsed);

    return this.EM.find(this.SC.entityDB, {
      select: select,
      skip: paginateParsed?.skip as number,
      take: paginateParsed?.take as number,
      where: {
        ...this.preFilterBuilded,
        ...buildWhereArray(filterParsed),
      } as FindOptionsWhere<any>,
    });
  }

  async fetchById(
    id: T['id'],
    select: Array<keyof TSelectDto> = this.SC.selectKeys,
  ): Promise<TSelectDto | null> {
    //@ts-ignore
    const res = await this.EM.find(this.SC.entityDB, {
      select,
      where: { id, ...this.preFilterBuilded },
    } as FindOptionsWhere<TSelectDto>[]);
    //@ts-ignore
    return res.length > 0 ? res[0] : null;
  }

  async insert(data: InsertDto[]): Promise<TSelectDto[]> {
    const res = await this.EM.save(this.SC.entityDB, data as InsertDto[], {
      chunk: 10000,
    });

    //@ts-ignore
    const res2 = res.map((el) => D.selectKeys(el, this.SC.selectKeys));
    console.log(res2[0]);
    //@ts-ignore
    return res2;
  }

  async patch(id: T['id'], data: UpdateDto): Promise<void> {
    const isExists = await this.isExists(id);
    if (!isExists) {
      throw new NotFoundException("Entity doesn't exist");
    }

    await this.EM.save(this.SC.entityDB, {
      ...data,
      id,
    } as QueryDeepPartialEntity<T>);
  }

  async delete(id: T['id']): Promise<void> {
    await this.EM.delete(this.SC.entityDB, id);
  }

  // async deleteAll(): Promise<void> {
  //   await this.EM.clear(this.SC.entityDB);
  // }

  async isExists(id: T['id']) {
    return this.EM.exists(this.SC.entityDB, {
      where: { id },
    } as FindManyOptions<T>);
  }

  ///  - BULK - ///

  async bulkIsExists(ids: T['id'][]) {
    const res = (await this.bulkFetchById(ids, ['id'])) as { id: T['id'] }[];
    const idsRes = res.map((e) => e.id);
    return {
      true: idsRes,
      false: A.difference(ids, idsRes),
    };
  }

  async bulkFetchById(
    ids: T['id'][],
    select: Array<keyof TSelectDto> = this.SC.selectKeys,
  ): Promise<TSelectDto[]> {
    //@ts-ignore
    return this.EM.find(this.SC.entityDB, {
      select,
      where: { id: In(ids), ...this.preFilterBuilded },
    } as FindManyOptions<T>);
  }

  async bulkPatch(ids: T['id'][], data: UpdateDto[]): Promise<void> {
    const IsExists = await this.bulkIsExists(ids);

    this.EM.save(this.SC.entityDB, {
      ...data,
      id: In(IsExists.true),
    } as QueryDeepPartialEntity<T>);

    if (IsExists.false.length > 0) {
      throw new NotFoundException({
        message: "Some Entities don't exist",
        ids: IsExists.false,
      });
    }
  }

  async bulkDelete(ids: T['id'][]): Promise<void> {
    await this.EM.delete(this.SC.entityDB, {
      id: In(ids),
    } as FindManyOptions<T>);
  }
}
