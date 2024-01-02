// import { Column, Entity } from 'typeorm';
// import { tags } from 'typia';
// import {
//   TDto,
//   TDtoPerRole,
//   TExtractDto,
//   TSettingCrudBis,
// } from 'packages/robusto-dto';
// import { TObjectValueOperatorWhere } from 'packages/robusto-crud/filter-query';
// import { Class, Opaque, UnwrapOpaque } from 'type-fest';
// import { literals } from 'typia/lib/misc';
// import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

// @Entity('users')
// export class UserDb extends BaseEntityRobusto {
//   email!: string;

//   password!: Opaque<string & tags.Format<'email'>, ALL['NO_INSERT']>;
// }

// type ALL = TDtoPerRole<'ALL'>;

// // type UnWrapAllkeysUserDb = {
// //   [K in keyof UserDb]: UserDb[K] extends Opaque<unknown, any>
// //     ? UnwrapOpaque<UserDb[K]>
// //     : UserDb[K];
// // };

// type UnwrapAnyValue<T> = {
//   [K in keyof T]: T[K] extends Opaque<unknown, any> ? UnwrapOpaque<T[K]> : T[K];
// };

// type UnWrapAnyToken<T> = {
//   [K in keyof T]: T[K] extends Opaque<unknown, infer Token> ? Token : never;
// };

// // type Resfef = UnWrapAnyToken<UserDb>;

// // type AllExtract = TExtractDto<UserDb, ALL>;

// type AllSettings = TSettingCrudBis<UserDb, ALL>;

// // <T extends BaseEntityDb, Role extends TDtoPerRole<any>>(
// //   settings: TSettingCrudBis<T, Role> & {
// //     wherePrefilter: TObjectValueOperatorWhere<T>[];
// //   },
// // )
// const generateInputForRobustoCrud = <
//   T extends BaseEntityRobusto,
//   Role extends TDtoPerRole<any>,
// >(
//   entity: Class<T>,
//   settings: TSettingCrudBis<T, Role> & {
//     wherePrefilter: TObjectValueOperatorWhere<T>[];
//   },
// ) => settings;

// type SelectDto = AllSettings['selectDto'];
// type InsertDto = AllSettings['insertDto'];
// type UpdateDto = AllSettings['updateDto'];

// // to change for generic and real values
// const settingsUserCrud = generateInputForRobustoCrud(UserDb, {
//   entityDB: UserDb,
//   selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
//   selectDto: {} as SelectDto,
//   insertDto: {} as InsertDto,
//   updateDto: {} as UpdateDto,
//   wherePrefilter: [],
// });

// type mm = typeof settingsUserCrud.selectDto;

// const fn = <T extends Class<BaseEntityRobusto>>(db: T) => {
//   return db;
// };

// fn(UserDb);

// // entityDB: UserDb as Class<UserDb> & Class<BaseEntityDb>,
// // insertDto: {} as AllExtract['insert'],
// // updateDto: {} as AllExtract['update'],
// // selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
