import { Column, Entity } from 'typeorm';
import { BaseEntityDb } from '../../../packages/robusto-crud/baseEntityDb.crudator';

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
