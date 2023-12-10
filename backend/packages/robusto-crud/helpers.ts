import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
  ObjectType,
  QueryFailedError,
} from 'typeorm';
import { TBaseEntityRobusto, TId } from './base-entity';
import {
  TObjectValueOperatorWhere,
  TPagination,
  assertListWhere,
  buildWhereArray,
} from './filter-query';
import { assert, createAssert } from 'typia';
import { Paths } from 'type-fest';
import { D } from '@mobily/ts-belt';
import { RemoveNever } from 'utils/types';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export namespace RobustoHelper {
  export const fetchAll = async <
    Entity extends TBaseEntityRobusto,
    SelectDto extends DeepPartial<Entity>,
  >(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
      selectKeys: (keyof SelectDto)[];
      assertSelectDto?: ReturnType<typeof createAssert<SelectDto[]>>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
      whereFilter?: typeof buildWhereArray<Entity>;
      filter?: TObjectValueOperatorWhere<Entity>[];
      paginate?: TPagination;
    },
  ): Promise<SelectDto[]> => {
    const filterParsed = settings.filter
      ? assertListWhere(settings.filter)
      : [];
    const paginateParsed = settings.paginate
      ? assert(settings.paginate)
      : undefined;

    //TODO: check for keys and relations because you can set keys without relations
    const res = await entityManager.find(settings.entityDB, {
      select: settings.selectKeys,
      ...(paginateParsed?.skip !== undefined && { skip: paginateParsed.skip }),
      ...(paginateParsed?.take !== undefined && { take: paginateParsed.take }),
      where: {
        ...settings.preFilterBuilded,
        ...settings.whereFilter,
      } as FindOptionsWhere<any>,
    });
    return settings.assertSelectDto ? settings.assertSelectDto(res) : res;
  };

  export const fetchById = async <
    Entity extends TBaseEntityRobusto,
    SelectDto extends DeepPartial<Entity>,
  >(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
      selectKeys: (keyof SelectDto)[];
      assertSelectDto?: ReturnType<typeof createAssert<SelectDto[]>>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    id: Entity['id'],
  ) => {
    const res = await entityManager.find(settings.entityDB, {
      select: settings.selectKeys,
      where: {
        id,
        ...settings.preFilterBuilded,
      } as FindOptionsWhere<any>,
    });

    if (res.length === 0) {
      throw new NotFoundException("Entity doesn't exist");
    }

    return settings.assertSelectDto ? settings.assertSelectDto(res) : res;
  };

  type RemoveKeysWithValueObjectOrArrayObject<T extends object> = RemoveNever<{
    [K in keyof T]: T[K] extends { id: TId } | { id: TId }[] ? never : T[K];
  }>;
  export const insert = async <
    Entity extends TBaseEntityRobusto,
    InsertDto extends DeepPartial<Entity>,
    SelectDto extends DeepPartial<Entity>,
  >(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
      uniqueKeys: (keyof InsertDto)[];
      selectKeys: (keyof SelectDto)[];
      assertSelectDto: ReturnType<typeof createAssert<SelectDto>>;
      assertInsertDto: ReturnType<typeof createAssert<InsertDto>>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    data: InsertDto | InsertDto[],
  ): Promise<RemoveKeysWithValueObjectOrArrayObject<SelectDto>> => {
    settings.assertInsertDto ? settings.assertInsertDto(data) : null;
    data = Array.isArray(data) ? data : [data];
    let res: Entity[] = [];
    try {
      res = await entityManager.save(settings.entityDB, data);
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        if (
          e.message.startsWith('duplicate key value violates unique constraint')
        ) {
          throw new ConflictException(
            `Unique constraint failed for keys: ${settings.uniqueKeys.join(
              ', ',
            )}`,
          );
        }
      }
      throw e;
    }
    if (res.length === 0) {
      throw new Error('No data inserted');
    }
    const uniqueRes = res[0];

    //TODO: see if relations are showed

    // const resSelected = D.selectKeys(res, settings.selectKeys) as SelectDto[];
    //@ts-expect-error
    const ResWithOnlySelectKeys = D.selectKeys(uniqueRes, settings.selectKeys);
    return ResWithOnlySelectKeys as RemoveKeysWithValueObjectOrArrayObject<SelectDto>;
  };

  export const isExists = async <Entity extends TBaseEntityRobusto>(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    id: Entity['id'],
  ): Promise<boolean> => {
    return entityManager.exists(settings.entityDB, {
      where: { id, ...settings.preFilterBuilded },
    } as FindManyOptions<Entity>);
  };

  export const patch = async <
    Entity extends TBaseEntityRobusto,
    UpdateDto extends DeepPartial<Entity>,
    SelectDto extends DeepPartial<Entity>,
  >(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
      uniqueKeys: (keyof UpdateDto)[];
      selectKeys: (keyof SelectDto)[];
      assertSelectDto?: ReturnType<typeof createAssert<SelectDto[]>>;
      assertUpdateDto?: ReturnType<typeof createAssert<UpdateDto[]>>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    id: Entity['id'],
    data: UpdateDto,
  ): Promise<RemoveKeysWithValueObjectOrArrayObject<SelectDto>> => {
    const isExists = await RobustoHelper.isExists(entityManager, settings, id);

    if (!isExists) {
      throw new NotFoundException("Entity doesn't exist");
    }

    let res: ObjectType<Entity> = {} as ObjectType<Entity>;
    try {
      res = await entityManager.save(settings.entityDB, {
        ...data,
        id,
      } as QueryDeepPartialEntity<Entity>);
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        if (
          e.message.startsWith('duplicate key value violates unique constraint')
        ) {
          throw new ConflictException(
            `Unique constraint failed for keys: ${settings.uniqueKeys.join(
              ', ',
            )}`,
          );
        }
      }
      throw e;
    }

    //TODO: see if relations are showed

    // const resSelected = D.selectKeys(res, settings.selectKeys) as SelectDto[];
    //@ts-expect-error
    const ResWithOnlySelectKeys = D.selectKeys(res, settings.selectKeys);
    return ResWithOnlySelectKeys as RemoveKeysWithValueObjectOrArrayObject<SelectDto>;
  };

  export const deleteItem = async <Entity extends TBaseEntityRobusto>(
    entityManager: EntityManager,
    settings: {
      entityDB: ObjectType<Entity>;
    },
    id: Entity['id'],
  ) => {
    await entityManager.delete(settings.entityDB, id);
  };
}

// const buildTupleUniqueKeysAndValues = <T extends object>(
//   data: T[],
//   keys: (keyof T)[],
// ) => {
//   return data.map((el) => {
//     return keys.map((key) => el[key]);
//   });
// };

// export const insert = async <
//   Entity extends TBaseEntityRobusto,
//   InsertDto extends DeepPartial<Entity>,
//   SelectDto extends DeepPartial<Entity>,
// > (settings: {
//   entityDB: ObjectType<Entity>;
//   selectKeys: (keyof SelectDto)[];
//   assertSelectDto?: ReturnType<typeof createAssert<SelectDto[]>>;
//   preFilterBuilded?: typeof buildWhereArray<Entity>;
//   wherePrefilter?: typeof buildWhereArray<Entity>;
//   filter?: TObjectValueOperatorWhere<Entity>[];
//   paginate?: TPagination;
// } => {

// }

// async insert(data: InsertDto[]): Promise<TSelectDto[]> {
//     const res = await entityManager.save(
//       settings.entityDB,
//       //@ts-ignore
//       data as InsertDto[],
//       {
//         chunk: 10000,
//       },
//     );

//     //@ts-ignore
//     const res2 = res.map((el) => D.selectKeys(el, settings.selectKeys));
//     //@ts-ignore
//     return res2;
//   },
