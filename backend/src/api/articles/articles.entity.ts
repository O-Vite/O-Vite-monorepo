import { Column, Entity } from 'typeorm';
import { BaseEntityDb } from '../../../packages/robusto-crud/base-entity';

@Entity()
export class Article extends BaseEntityDb {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title!: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  content!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  confidential!: string;
}
