import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientEntity } from './client.entity';
import { DelivererEntity } from './deliverer.entity';
import { OrderProductEntity } from './order_product.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';
import { UserEntity } from './user.entity';

export enum OrderState {
  PAID = 'paid',
  NOT_TAKEN = 'not_taken',
  TAKEN = 'taken',
  DELIVERED = 'delivered',
}

@Entity('order')
export class OrderEntity extends BaseEntityRobusto {
  @Column('enum', {
    enum: OrderState,
  })
  state!: OrderState;

  @Column('text')
  address!: string;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts!: OrderProductEntity[];

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.orders)
  client!: ClientEntity;

  @ManyToOne(
    () => DelivererEntity,
    (deliverer: DelivererEntity) => deliverer.orders,
  )
  deliverer!: DelivererEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders, {
    nullable: true,
  })
  user?: UserEntity;

  @Column({ nullable: false })
  userId!: string;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.deliverer)
  orders!: OrderEntity[];
}
