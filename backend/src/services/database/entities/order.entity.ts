import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { DelivererEntity } from './deliverer.entity';
import { OrderProductEntity } from './order_product.entity';
import { UserEntity } from './user.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

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

  @ManyToOne(() => UserEntity, (user) => user.orders, { nullable: true })
  user?: UserEntity;

  @Column({ nullable: false })
  userId!: string;

  @Column('text')
  deliveryAddress!: string;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts!: OrderProductEntity[];

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client?: ClientEntity;

  @ManyToOne(() => DelivererEntity, (deliverer) => deliverer.orders)
  deliverer!: DelivererEntity;
}
