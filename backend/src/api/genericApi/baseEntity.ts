import { PrimaryGeneratedColumn } from 'typeorm';
import { TId } from 'src/services/database/entities/user.entity';

// type DateCustom = tags.TagBase<{
//   kind: 'dateCustom';
//   target: 'Date';
//   value: undefined;
//   validate: `$input.constructor.name === "Date"`;
// }>;

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: TId;

  // @CreateDateColumn({ type: 'timestamp with time zone' })
  // public createdAt: string & tags.Format<'date-time'>;

  // @UpdateDateColumn({ type: 'timestamp with time zone' })
  // public updatedAt: string & tags.Format<'date-time'>;
}
