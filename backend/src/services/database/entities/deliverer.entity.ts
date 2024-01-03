import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';
import { UserEntity } from './user.entity';

@Entity('deliverer')
export class DelivererEntity extends BaseEntityRobusto {
  @Column('text')
  name!: string;

  @Column('boolean')
  isVerified!: boolean;

  @OneToMany(() => OrderEntity, (order) => order.deliverer)
  orders!: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.deliverers)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}
