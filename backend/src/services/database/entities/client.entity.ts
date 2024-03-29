import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('client')
export class ClientEntity extends BaseEntityRobusto {
  @OneToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn()
  user!: UserEntity;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.client, {
    onDelete: 'CASCADE',
  })
  orders!: OrderEntity[] | null;
}
