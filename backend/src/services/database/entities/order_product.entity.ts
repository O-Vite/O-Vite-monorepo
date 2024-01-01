import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { Product } from '../../../api/products/product.entity';

@Entity('order_product')
export class OrderProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int')
  quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  order!: OrderEntity;

  @Column({ type: 'uuid' })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'productId' })
  product!: Product;
}
