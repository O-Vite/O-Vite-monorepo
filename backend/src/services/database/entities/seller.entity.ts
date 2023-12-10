import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('seller')
export class SellerEntity extends BaseEntityRobusto {
  @Column('int')
  siret!: number;

  @Column('boolean')
  isVerified!: boolean;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;
}