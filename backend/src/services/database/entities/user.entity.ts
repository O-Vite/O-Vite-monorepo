import { Column, Entity } from 'typeorm';
import { BaseEntityDb } from '../../../../packages/robusto-crud/base-entity';
import { tags } from 'typia';

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
  password!: string;
}
