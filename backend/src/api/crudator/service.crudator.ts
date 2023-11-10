import { dataSource } from 'src/services/database/entities/database.service';
import { Class as TClass } from 'type-fest';
import { BaseEntity } from '../genericApi/baseEntity';
import { DeepPartial, FindManyOptions, FindOneOptions, In } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { A, D } from '@mobily/ts-belt';
export class Crudator<T extends BaseEntity> {
  private EM = dataSource.manager;
  // TODO: fournir selectDto ,entityDB, insertDto, updateDto, where prefilters
  constructor(
    private readonly entityDb: TClass<T>,
    private readonly select: Array<keyof T>,
  ) {}

  async fetchAll(select: Array<keyof T> = this.select): Promise<T[]> {
    return this.EM.find(this.entityDb, {
      select: select,
    });
  }

  async fetchById(
    id: T['id'],
    select: Array<keyof T> = this.select,
  ): Promise<T | null> {
    return this.EM.findOne(this.entityDb, {
      select,
      where: { id },
    } as FindOneOptions<T>);
  }

  async insert(data: Partial<T>[]): Promise<T[]> {
    const res = await this.EM.save(this.entityDb, data as T[]);
    return res.map((e) => D.selectKeys(e, this.select));
  }

  async patch(id: T['id'], data: DeepPartial<T>): Promise<void> {
    const isExists = await this.isExists(id);
    if (!isExists) {
      throw new NotFoundException("Entity doesn't exist");
    }

    this.EM.save(this.entityDb, { ...data, id } as QueryDeepPartialEntity<T>);
  }

  async delete(id: T['id']): Promise<void> {
    await this.EM.delete(this.entityDb, id);
  }

  async isExists(id: T['id']) {
    return this.EM.exists(this.entityDb, {
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
    select: Array<keyof T> = this.select,
  ): Promise<T[]> {
    return this.EM.find(this.entityDb, {
      select,
      where: { id: In(ids) },
    } as FindManyOptions<T>);
  }

  async bulkPatch(ids: T['id'][], data: DeepPartial<T>[]): Promise<void> {
    const IsExists = await this.bulkIsExists(ids);

    this.EM.save(this.entityDb, {
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
    await this.EM.delete(this.entityDb, {
      id: In(ids),
    } as FindManyOptions<T>);
  }
}

// async insert(data: Partial<T>) {
//   return repo.save(data);
// },
// async delete(id: number) {
//   return repo.delete(id);
// },
// async patch(id: number, data: Partial<T>) {
//   return repo.update(id, data);
// },

//   async fetchById(id: TId) {
//     return this.EM.findOneBy<ObjectType<T>>(this.entityDb, { id });
//   }
//   async insert(data: DeepPartial<BaseEntity>) {
//     return this.EM.save(this.entityDb, data as T);
//   }
//   async delete(id: TId) {
//     return this.EM.delete(this.entityDb, id);
//   }
//   async patch(id: TId, data: DeepPartial<BaseEntity>) {
//     const isExists = this.fetchById(id) !== null;
//     if (!isExists) {
//       throw new NotFoundException("Entity doesn't exist");
//     }
//     this.EM.update<ObjectType<T>>(this.entityDb, id, data);
//   }
//   // async fetchById(id: TId) {
//   //   return this.EM.findOneBy(this.EntityDb, { id });
//   // }
//   // async insert(data: DeepPartial<BaseEntity>) {
//   //   return this.EM.save(this.EntityDb, data);
//   // }
//   // async delete(id: TId) {
//   //   await this.EM.delete(this.EntityDb, id);
//   // }
//   // async patch(id: TId, data: DeepPartial<BaseEntity>) {
//   //   const isExists = (await this.fetchById(id)) !== null;
//   //   if (!isExists) {
//   //     throw new NotFoundException("Entity doesn't exist");
//   //   }
//   //   this.EM.update(this.EntityDb, id, data);
//   // }
