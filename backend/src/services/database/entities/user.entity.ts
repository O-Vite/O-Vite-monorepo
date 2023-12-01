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

@Entity('user')
export class UserDb extends BaseEntityDb {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  email!: string & tags.Format<'email'>;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  password!: string & ALL['NO_SELECT'];
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

const settingsUserCrud = generateInputForRobustoCrud(UserDb, {
  entityDB: UserDb,
  selectKeys: literals<keyof Res['selectDto']>(),
  selectDto: {} as Res['selectDto'],
  insertDto: {} as Res['insertDto'],
  updateDto: {} as Res['updateDto'],
  wherePrefilter: [],
});

const fn = <T extends Class<BaseEntityDb>>(db: T) => {
  return db;
};

fn(UserDb);

// entityDB: UserDb as Class<UserDb> & Class<BaseEntityDb>,
// insertDto: {} as AllExtract['insert'],
// updateDto: {} as AllExtract['update'],
// selectKeys: ['email', 'id', 'createdAt', 'updatedAt'],
