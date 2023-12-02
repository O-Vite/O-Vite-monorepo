import { BaseEntityDb } from 'packages/robusto-crud/base-entity';
import { Class } from 'type-fest';
import { ObjectType } from 'typeorm';
import { literals } from 'typia/lib/misc';
import { UnionToArray } from '../../src/api/users/testBis';

// -> lib //
export type TDto<Token extends PropertyKey> = {
  readonly aa: { [K in Token]: void };
};

type No_Insert = TDto<'NO_INSERT'>;
type No_Update = TDto<'NO_UPDATE'>;
type No_Select = TDto<'NO_SELECT'>;

export type TDtoPerRole<T extends string> = {
  NO_INSERT: TDto<T> & No_Insert;
  NO_UPDATE: TDto<T> & No_Update;
  NO_SELECT: TDto<T> & No_Select;
  NO_INSERT_NO_UPDATE: TDto<T> & No_Insert & No_Update;
};

export type TExtractDto<Entity extends object, T extends TDtoPerRole<any>> = {
  insert: keyof {
    [K in keyof Entity as Entity[K] extends
      | T['NO_INSERT']
      | TDtoPerRole<'DEFAULT'>['NO_INSERT']
      ? never
      : K]: Entity[K];
  };
  update: keyof {
    [K in keyof Entity as Entity[K] extends
      | T['NO_UPDATE']
      | TDtoPerRole<'DEFAULT'>['NO_UPDATE']
      ? never
      : K]: Entity[K];
  };
  select: keyof {
    [K in keyof Entity as Entity[K] extends
      | T['NO_SELECT']
      | TDtoPerRole<'DEFAULT'>['NO_SELECT']
      ? never
      : K]: Entity[K];
  };
};

export type TSettingCrudBis<
  Entity extends BaseEntityDb,
  Role extends TDtoPerRole<any>,
  T extends TExtractDto<Entity, Role> = TExtractDto<Entity, Role>,
> = {
  entityDB: Class<Entity>;
  insertDto: {
    [K in T['insert']]: Entity[K];
  };
  // insertDto: Record<T['insert'][number], Entity[T['insert'][number]]>;
  updateDto: {
    [K in T['update']]: Entity[K];
  };
  selectKeys: T['select'][];
  selectDto: {
    [K in T['select']]: Entity[K];
  };
};

// <- lib //

// interface User {
//   id: number;
//   email: string & Admin['NO_INSERT'];
//   password: string & (Admin['NO_UPDATE'] & Admin['NO_SELECT']);
// }

// type Admin = TDtoPerRole<'ADMIN'>;
// type Client = DtoPerRole<'CLIENT'>;

// type AdminConfig = AdminGeneratorConfig<User>;

// type AdminGeneratorConfig<T extends object> = TExtractDto<T, Admin>;

// fn<AdminConfig>({
//   insert: literals<AdminConfig['insert']>(),
//   update: literals<AdminConfig['update']>(),
//   select: literals<AdminConfig['select']>(),
// });

// const fn = <T extends TExtractDto<any, TDtoPerRole<any>>>(
//   item: TConfigWithArrayValue<T>,
// ) => item;
