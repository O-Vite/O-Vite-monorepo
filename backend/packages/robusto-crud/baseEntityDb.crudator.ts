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

  public testDate!: string & tags.Format<'date-time'>;
}

export type TOmitBaseEntity<T, U extends keyof T = never> = Omit<
  T,
  keyof BaseEntityDb | U
>;
