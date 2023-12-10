import { EntityManager, DeepPartial, ObjectType } from 'typeorm';
import { TBaseEntityRobusto } from './base-entity';
import { createAssert } from 'typia';
import { buildWhereArray } from './filter-query';

export const useRobustoCrud =
  (entityManager: EntityManager) =>
  async <
    Entity extends TBaseEntityRobusto,
    SelectDto extends DeepPartial<Entity>,
    InsertDto extends DeepPartial<Entity>,
    UpdateDto extends DeepPartial<Entity>,
  >(settings: {
    entityDB: ObjectType<Entity>;
    uniqueKeys: (keyof InsertDto)[];
    selectKeys: (keyof SelectDto)[];
    assertSelectDto: ReturnType<typeof createAssert<SelectDto>>;
    assertInsertDto: ReturnType<typeof createAssert<InsertDto>>;
    assertUpdateDto: ReturnType<typeof createAssert<UpdateDto>>;
    preFilterBuilded?: typeof buildWhereArray<Entity>;
  }) => {};

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
