import { EntityManager, DeepPartial, ObjectType } from 'typeorm';
import { TBaseEntityRobusto } from './base-entity';
import { createAssert, createAssertEquals } from 'typia';
import {
  TObjectValueOperatorWhere,
  TPagination,
  buildWhereArray,
} from './filter-query';
import { RobustoHelper } from './helpers';

export const useRobustoCrud =
  (entityManager: EntityManager) =>
  <
    Entity extends TBaseEntityRobusto,
    SelectDto extends DeepPartial<Entity>,
    InsertDto extends DeepPartial<Entity>,
    UpdateDto extends DeepPartial<Entity>,
  >(TheSettings: {
    entityDB: ObjectType<Entity>;
    selectKeys: (keyof SelectDto)[];
    assertSelectDto: ReturnType<typeof createAssertEquals<SelectDto>>;
    assertSelectDtoArray: ReturnType<typeof createAssertEquals<SelectDto[]>>;
    assertInsertDto: ReturnType<typeof createAssertEquals<InsertDto>>;
    assertUpdateDto: ReturnType<typeof createAssertEquals<UpdateDto>>;
    preFilterBuilded?: typeof buildWhereArray<Entity>;
  }) => {
    return {
      fetchAll: (Asettings?: {
        filter?: TObjectValueOperatorWhere<Entity>[];
        paginate?: TPagination;
      }): Promise<SelectDto[]> => {
        return RobustoHelper.fetchAll<Entity, SelectDto>(entityManager, {
          entityDB: TheSettings.entityDB,
          selectKeys: TheSettings.selectKeys,
          assertSelectDtoArray: TheSettings.assertSelectDtoArray,
          preFilterBuilded: TheSettings.preFilterBuilded,
          filter: Asettings?.filter,
          paginate: Asettings?.paginate,
        });
      },
      fetchById: (id: Entity['id']): Promise<SelectDto> => {
        return RobustoHelper.fetchById<Entity, SelectDto>(
          entityManager,
          {
            entityDB: TheSettings.entityDB,
            selectKeys: TheSettings.selectKeys,
            assertSelectDto: TheSettings.assertSelectDto,
            preFilterBuilded: TheSettings.preFilterBuilded,
          },
          id,
        );
      },
      insert: (data: InsertDto | InsertDto[]) => {
        return RobustoHelper.insert<Entity, InsertDto, SelectDto>(
          entityManager,
          {
            entityDB: TheSettings.entityDB,
            selectKeys: TheSettings.selectKeys,
            assertSelectDto: TheSettings.assertSelectDto,
            assertInsertDto: TheSettings.assertInsertDto,
            preFilterBuilded: TheSettings.preFilterBuilded,
          },
          data,
        );
      },
      patch: (id: Entity['id'], data: UpdateDto) => {
        return RobustoHelper.patch<Entity, UpdateDto, SelectDto>(
          entityManager,
          {
            entityDB: TheSettings.entityDB,
            selectKeys: TheSettings.selectKeys,
            assertSelectDto: TheSettings.assertSelectDto,
            assertUpdateDto: TheSettings.assertUpdateDto,
            preFilterBuilded: TheSettings.preFilterBuilded,
          },
          { ...data, id },
        );
      },
      delete: (id: Entity['id']) => {
        return RobustoHelper.deleteItem<Entity>(
          entityManager,
          {
            entityDB: TheSettings.entityDB,
          },
          id,
        );
      },
    };
  };

//   ///  - BULK - ///

//   async bulkIsExists(ids: T['id'][]) {
//     const res = (await this.bulkFetchById(ids, ['id'])) as {
//       id: T['id'];
//     }[];
//     const idsRes = res.map((e) => e.id);
//     return {
//       true: idsRes,
//       false: A.difference(ids, idsRes),
//     };
//   },

//   async bulkFetchById(
//     ids: T['id'][],
//     select: Array<keyof TSelectDto> = settings.selectKeys,
//   ): Promise<TSelectDto[]> {
//     //@ts-ignore
//     return entityManager.find(settings.entityDB, {
//       select,
//       where: { id: In(ids), ...preFilterBuilded },
//     } as FindManyOptions<T>);
//   },

//   async bulkPatch(ids: T['id'][], data: UpdateDto[]): Promise<void> {
//     const IsExists = await this.bulkIsExists(ids);

//     entityManager.save(settings.entityDB, {
//       ...data,
//       id: In(IsExists.true),
//     } as QueryDeepPartialEntity<T>);

//     if (IsExists.false.length > 0) {
//       throw new NotFoundException({
//         message: "Some Entities don't exist",
//         ids: IsExists.false,
//       });
//     }
//   },

//   async bulkDelete(ids: T['id'][]): Promise<void> {
//     await entityManager.delete(settings.entityDB, {
//       id: In(ids),
//     } as FindManyOptions<T>);
//   },
// };
//   };
// };
