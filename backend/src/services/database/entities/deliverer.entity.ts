import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('deliverer')
export class DelivererEntity extends BaseEntityRobusto {
  @Column('text')
  name!: string;

  @Column('boolean')
  isVerified!: boolean;

  @OneToMany(() => OrderEntity, (order) => order.deliverer)
  orders!: OrderEntity[];

  @Column('text')
  kbisNumber!: string;
}
