import { BaseEntity } from 'src/generic/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string = '';
  @Column({
    type: 'varchar',
    nullable: true,
  })
  content: string = '';

  @Column({
    type: 'varchar',
    nullable: false,
  })
  confidential: string = '';
}
