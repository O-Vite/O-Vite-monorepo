import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('client')
export class ClientEntity extends BaseEntityRobusto {
  @Column('text')
  name!: string;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders!: OrderEntity[];
}
