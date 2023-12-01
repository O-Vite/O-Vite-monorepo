import { Except } from 'type-fest';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { tags } from 'typia';
import { TOmit } from 'utils/types';

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
  id!: TId;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public createdAt!: string & tags.Format<'date-time'>;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public updatedAt!: string & tags.Format<'date-time'>;
}

export type TOmitBaseEntity<
  T extends BaseEntityDb,
  K extends keyof Except<T, keyof BaseEntityDb> = never,
> = Except<Except<T, keyof BaseEntityDb>, K>;
