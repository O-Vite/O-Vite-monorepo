import { Entity, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('order_product')
export class OrderProductEntity extends BaseEntityRobusto {
  @Column('int')
  quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  product!: ProductEntity;
}
