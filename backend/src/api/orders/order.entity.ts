import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from '../../services/database/entities/client.entity';
import { DelivererEntity } from '../../services/database/entities/deliverer.entity';
import { OrderProductEntity } from '../../services/database/entities/order_product.entity';

export enum OrderState {
  PAID = 'paid',
  NOT_TAKEN = 'not_taken',
  TAKEN = 'taken',
  DELIVERED = 'delivered',
}

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.NOT_TAKEN,
  })
  state: OrderState = OrderState.NOT_TAKEN;

  @Column('text')
  deliveryAddress?: string;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client?: ClientEntity;

  @ManyToOne(() => DelivererEntity, (deliverer) => deliverer.orders)
  deliverer?: DelivererEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts?: OrderProductEntity[];
}
