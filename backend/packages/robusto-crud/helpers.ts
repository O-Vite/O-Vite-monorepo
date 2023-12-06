import {
  DeepPartial,
  EntityManager,
  FindOptionsWhere,
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
      selectKeys: [keyof SelectDto];
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
}
