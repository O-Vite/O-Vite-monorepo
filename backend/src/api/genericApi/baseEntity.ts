import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TId } from 'src/services/database/entities/user.entity';
import { tags } from 'typia';

// type DateCustom = tags.TagBase<{
//   kind: 'dateCustom';
//   target: 'Date';
//   value: undefined;
//   validate: `$input.constructor.name === "Date"`;
// }>;

const TransformDate = {
  from(value: Date) {
    return value.toISOString();
  },
  to(value: string) {
    return value;
  },
};

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: TId;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public createdAt: string & tags.Format<'date-time'>;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public updatedAt: string & tags.Format<'date-time'>;

  public testDate: string & tags.Format<'date-time'>;
}

export type TOmitBaseEntity<T, U extends keyof T = never> = Omit<
  T,
  keyof BaseEntity | U
>;
