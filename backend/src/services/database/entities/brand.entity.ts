import { Entity, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('brand')
export class BrandEntity extends BaseEntityRobusto {
  @Column('text')
  name!: string;

  @OneToMany(() => ProductEntity, (product) => product.brand, { cascade: true })
  products!: ProductEntity[];
}
