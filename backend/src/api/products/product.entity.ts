import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProductEntity } from '../../services/database/entities/order_product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column()
  imageUrl: string;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts!: OrderProductEntity[];

  constructor(
    name: string,
    description: string,
    price: number,
    imageUrl: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
