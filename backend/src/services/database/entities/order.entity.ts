import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientEntity } from './client.entity';
import { DelivererEntity } from './deliverer.entity';
import { OrderProductEntity } from './order_product.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

enum OrderState {
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

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client?: ClientEntity;

  @ManyToOne(() => DelivererEntity, (deliverer) => deliverer.orders)
  deliverer!: DelivererEntity;
}
