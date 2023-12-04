import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ComplainEntity } from './complain.entity';
import { MessageEntity } from './message.entity';

enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  DELIVERER = 'deliverer',
  SUPPORT = 'support',
  SELLER = 'seller',
}

@Entity('user')
export class UserEntity extends BaseEntityRobusto {
  @Column('text')
  email!: string;

  @Column('varchar', {
    length: 60,
    select: false,
  })
  password!: string;

  @Column('text')
  phoneNumber!: string;

  @Column('text')
  name!: string;

  @Column('text')
  firstName!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role!: UserRole;

  @Column('boolean')
  isVerified!: boolean;

  @OneToMany(
    () => ComplainEntity,
    (complain: ComplainEntity) => complain.userComplaining,
  )
  complains!: ComplainEntity[];

  @OneToMany(() => MessageEntity, (message: MessageEntity) => message.user)
  messages!: MessageEntity[];
}
