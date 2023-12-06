import {
  DeepPartial,
  EntityManager,
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  ObjectType,
} from 'typeorm';
import { TBaseEntityRobusto } from './base-entity';
import {
  TObjectValueOperatorWhere,
  TPagination,
  assertListWhere,
  buildWhereArray,
} from './filter-query';
import { assert, createAssert } from 'typia';
import { Paths } from 'type-fest';
import { D } from '@mobily/ts-belt';

type makeObjectFromKeys<
  InitialObject extends object,
  Keys extends keyof DeepPartial<InitialObject>,
> = {
  [K in Keys]: InitialObject[K];
};

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
      assertInsertDto?: ReturnType<typeof createAssert<InsertDto[]>>;
      assertSelectDto?: ReturnType<typeof createAssert<SelectDto[]>>;
      preFilterBuilded?: typeof buildWhereArray<Entity>;
    },
    data: InsertDto | InsertDto[],
  ): Promise<SelectDto[]> => {
    settings.assertInsertDto ? settings.assertInsertDto(data) : null;
    data = Array.isArray(data) ? data : [data];
    // const isAllKeysUnique = (
    //   await Promise.all(
    //     settings.uniqueKeys.map(async (key) => {
    //       // const ee = { [key]: In(data.map((el) => el[key])) } as any;
    //       const res = await entityManager.find(settings.entityDB, {
    //         select: ['id'] as any,
    //         where: { [key]: In(['matteodel@outloofdfk2.fr'] as any) } as any,
    //       });
    //       return res.length === 0;
    //     }),
    //   )
    // ).every((el) => true);

    // if (!isAllKeysUnique) {
    //   throw new Error('Some keys are not unique');
    // }

    const res = await entityManager.save(settings.entityDB, data, {
      chunk: 1000,
    });
    //TODO: see if relations are showed

    // const resSelected = D.selectKeys(res, settings.selectKeys) as SelectDto[];
    const ResWithOnlySelectKeys = res.map((el) =>
      //@ts-expect-error
      D.selectKeys(el, settings.selectKeys),
    );
    //@ts-expect-error
    return ResWithOnlySelectKeys as SelectDto[];
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
