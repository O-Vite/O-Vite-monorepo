import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('deliverer')
export class DelivererEntity extends BaseEntityRobusto {
  @Column('int')
  kbisNumber!: number;

  @OneToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn()
  user!: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.deliverer)
  orders!: OrderEntity[];
}
