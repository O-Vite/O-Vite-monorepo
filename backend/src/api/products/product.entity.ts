import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
