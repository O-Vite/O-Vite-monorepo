import { Column, Entity } from 'typeorm';
import { BaseEntityDb } from '../../../../packages/robusto-crud/base-entity';
import { tags } from 'typia';
import {
  TDto,
  TDtoPerRole,
  TExtractDto,
  TSettingCrudBis,
} from 'packages/robusto-dto';
import { TObjectValueOperatorWhere } from 'packages/robusto-crud/filter-query';
import { Class, Opaque, UnwrapOpaque } from 'type-fest';
import { literals } from 'typia/lib/misc';

type ALL = TDtoPerRole<'ALL'>;

@Entity('users')
export class UserDb extends BaseEntityDb {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  email!: string & tags.Format<'email'>;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password!: Opaque<string, ALL['NO_SELECT']>;
}

type UnWrapAllkeysUserDb = {
  [K in keyof UserDb]: UserDb[K] extends Opaque<unknown, any>
    ? UnwrapOpaque<UserDb[K]>
    : UserDb[K];
};

type UnwrapAnyToken<T> = {
  [K in keyof T]: T[K] extends Opaque<unknown, any> ? UnwrapOpaque<T[K]> : T[K];
};

type Resfef = UnwrapAnyToken<UserDb>;

type AllExtract = TExtractDto<UserDb, ALL>;

type Res = TSettingCrudBis<UserDb, ALL>;

// <T extends BaseEntityDb, Role extends TDtoPerRole<any>>(
//   settings: TSettingCrudBis<T, Role> & {
//     wherePrefilter: TObjectValueOperatorWhere<T>[];
//   },
// )
const generateInputForRobustoCrud = <
  T extends BaseEntityDb,
  Role extends TDtoPerRole<any>,
>(
  entity: Class<T>,
  settings: TSettingCrudBis<T, Role> & {
    wherePrefilter: TObjectValueOperatorWhere<T>[];
  },
) => settings;

type SelectDto = Res['selectDto'];
type InsertDto = Res['insertDto'];
type UpdateDto = Res['updateDto'];

// to change for generic and real values
const settingsUserCrud = generateInputForRobustoCrud(UserDb, {
  entityDB: UserDb,
  selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
  selectDto: {} as SelectDto,
  insertDto: {} as InsertDto,
  updateDto: {} as UpdateDto,
  wherePrefilter: [],
});

type mm = typeof settingsUserCrud.selectDto;

// const fn = <T extends Class<BaseEntityDb>>(db: T) => {
//   return db;
// };

// fn(UserDb);

// entityDB: UserDb as Class<UserDb> & Class<BaseEntityDb>,
// insertDto: {} as AllExtract['insert'],
// updateDto: {} as AllExtract['update'],
// selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
