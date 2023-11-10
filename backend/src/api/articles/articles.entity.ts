import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../genericApi/baseEntity';

@Entity()
export class Article extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  confidential: string;
}
