import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BrandEntity } from './brand.entity';
import { OrderProductEntity } from './order_product.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

export enum Capacity {
  '0.33L',
  '0.5L',
  '1L',
  '1.5L',
  '2L',
  '5L',
}

@Entity('product')
export class ProductEntity extends BaseEntityRobusto {
  @Column('float')
  price!: number;

  @Column('enum', {
    enum: Capacity,
  })
  capacity!: Capacity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts!: OrderProductEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand!: BrandEntity;
}
