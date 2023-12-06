import {
  DeepPartial,
  EntityManager,
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  ObjectType,
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
      wherePrefilter?: typeof buildWhereArray<Entity>;
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
        ...settings.wherePrefilter,
      } as FindOptionsWhere<any>,
    });
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
      assertSelectDto: ReturnType<typeof createAssert<SelectDto[]>>;
      assertInsertDto: ReturnType<typeof createAssert<InsertDto[]>>;

      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    data: InsertDto | InsertDto[],
  ): Promise<RemoveKeysWithValueObjectOrArrayObject<SelectDto>[]> => {
    settings.assertInsertDto ? settings.assertInsertDto(data) : null;
    data = Array.isArray(data) ? data : [data];

    const res = await entityManager.save(settings.entityDB, data, {
      chunk: 1000,
    });
    //TODO: see if relations are showed

    // const resSelected = D.selectKeys(res, settings.selectKeys) as SelectDto[];
    const ResWithOnlySelectKeys = res.map((el) =>
      //@ts-expect-error
      D.selectKeys(el, settings.selectKeys),
    );

    return ResWithOnlySelectKeys as RemoveKeysWithValueObjectOrArrayObject<SelectDto>[];
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
