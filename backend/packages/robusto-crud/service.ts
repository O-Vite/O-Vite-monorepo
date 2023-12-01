import { BaseEntityDb } from './base-entity';
import {
  DeepPartial,
  EntityManager,
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
} from './filter-query';

type TSettingCrud<
  TEntity extends BaseEntityDb,
  TInsertDto extends Partial<TEntity>,
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

export const useRobustoCrud =
  (entityManager: EntityManager) =>
  <
    T extends BaseEntityDb,
    InsertDto extends Partial<T>,
    UpdateDto extends DeepPartial<T>,
    TSelectDto extends DeepPartial<T>,
  >(
    settings: TSettingCrud<T, InsertDto, UpdateDto, TSelectDto>,
  ) => {
    const preFilterBuilded = buildWhereArray(settings.wherePrefilter);
    return {
      async fetchAll(
        filter: string = '',
        paginate: string = '',
        select: Array<keyof TSelectDto> = settings.selectKeys,
      ): Promise<TSelectDto[]> {
        const filterParsed =
          filter !== ''
            ? (JSON.parse(filter) as TObjectValueOperatorWhere<T>[])
            : [];
        const paginateParsed =
          paginate !== '' ? (JSON.parse(paginate) as TPagination) : null;
        assertListWhere(filterParsed);

        return entityManager.find(settings.entityDB, {
          select: select,
          skip: paginateParsed?.skip as number,
          take: paginateParsed?.take as number,
          where: {
            ...preFilterBuilded,
            ...buildWhereArray(filterParsed),
          } as FindOptionsWhere<any>,
        });
      },

      async fetchById(
        id: T['id'],
        select: Array<keyof TSelectDto> = settings.selectKeys,
      ): Promise<TSelectDto | null> {
        //@ts-ignore
        const res = await entityManager.find(settings.entityDB, {
          select,
          where: { id, ...preFilterBuilded },
        } as FindOptionsWhere<TSelectDto>[]);
        //@ts-ignore
        return res.length > 0 ? res[0] : null;
      },

      async insert(data: InsertDto[]): Promise<TSelectDto[]> {
        const res = await entityManager.save(
          settings.entityDB,
          //@ts-ignore
          data as InsertDto[],
          {
            chunk: 10000,
          },
        );

        //@ts-ignore
        const res2 = res.map((el) => D.selectKeys(el, settings.selectKeys));
        //@ts-ignore
        return res2;
      },

      async patch(id: T['id'], data: UpdateDto): Promise<void> {
        const isExists = await this.isExists(id);
        if (!isExists) {
          throw new NotFoundException("Entity doesn't exist");
        }

        await entityManager.save(settings.entityDB, {
          ...data,
          id,
        } as QueryDeepPartialEntity<T>);
      },

      async delete(id: T['id']): Promise<void> {
        await entityManager.delete(settings.entityDB, id);
      },

      async isExists(id: T['id']) {
        return entityManager.exists(settings.entityDB, {
          where: { id },
        } as FindManyOptions<T>);
      },

      ///  - BULK - ///

      async bulkIsExists(ids: T['id'][]) {
        const res = (await this.bulkFetchById(ids, ['id'])) as {
          id: T['id'];
        }[];
        const idsRes = res.map((e) => e.id);
        return {
          true: idsRes,
          false: A.difference(ids, idsRes),
        };
      },

      async bulkFetchById(
        ids: T['id'][],
        select: Array<keyof TSelectDto> = settings.selectKeys,
      ): Promise<TSelectDto[]> {
        //@ts-ignore
        return entityManager.find(settings.entityDB, {
          select,
          where: { id: In(ids), ...preFilterBuilded },
        } as FindManyOptions<T>);
      },

      async bulkPatch(ids: T['id'][], data: UpdateDto[]): Promise<void> {
        const IsExists = await this.bulkIsExists(ids);

        entityManager.save(settings.entityDB, {
          ...data,
          id: In(IsExists.true),
        } as QueryDeepPartialEntity<T>);

        if (IsExists.false.length > 0) {
          throw new NotFoundException({
            message: "Some Entities don't exist",
            ids: IsExists.false,
          });
        }
      },

      async bulkDelete(ids: T['id'][]): Promise<void> {
        await entityManager.delete(settings.entityDB, {
          id: In(ids),
        } as FindManyOptions<T>);
      },
    };
  };
