import { Column, Entity } from 'typeorm';
import { BaseEntityDb } from '../../../../packages/robusto-crud/base-entity';
import { tags } from 'typia';
import {
  TDtoPerRole,
  TExtractDto,
  TSettingCrudBis,
} from 'packages/robusto-dto';
import { TObjectValueOperatorWhere } from 'packages/robusto-crud/filter-query';
import { Class } from 'type-fest';
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
  password!: string;
}

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

// const fn = <T extends Class<BaseEntityDb>>(db: T) => {
//   return db;
// };

// fn(UserDb);

// entityDB: UserDb as Class<UserDb> & Class<BaseEntityDb>,
// insertDto: {} as AllExtract['insert'],
// updateDto: {} as AllExtract['update'],
// selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
