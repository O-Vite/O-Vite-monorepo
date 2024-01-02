import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ComplainEntity } from './complain.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('support')
export class SupportEntity extends BaseEntityRobusto {
  @OneToMany(() => ComplainEntity, (complain) => complain.support)
  complains!: ComplainEntity[];

  @OneToOne(() => UserEntity, {
    cascade: true,
    orphanedRowAction: 'disable',
  })
  @JoinColumn()
  user!: UserEntity;
}
