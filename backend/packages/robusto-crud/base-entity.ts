import { TDtoPerRole } from 'packages/robusto-dto';
import { Except } from 'type-fest';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { tags } from 'typia';

const TransformDate = {
  from(value: Date) {
    return value.toISOString();
  },
  to(value: string) {
    return value;
  },
};

export type TId = string & tags.Format<'uuid'>;

export class BaseEntityDb {
  @PrimaryGeneratedColumn('uuid')
  id!: TId & DEFAULT['NO_INSERT_NO_UPDATE'];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public createdAt!: string &
    tags.Format<'date-time'> &
    DEFAULT['NO_INSERT_NO_UPDATE'];

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public updatedAt!: string &
    tags.Format<'date-time'> &
    DEFAULT['NO_INSERT_NO_UPDATE'];
}

type DEFAULT = TDtoPerRole<'DEFAULT'>;

export type TOmitBaseEntity<
  T extends BaseEntityDb,
  K extends keyof Except<T, keyof BaseEntityDb> = never,
> = Except<Except<T, keyof BaseEntityDb>, K>;
