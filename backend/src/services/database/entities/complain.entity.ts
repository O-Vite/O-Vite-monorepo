import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { SupportEntity } from './support.entity';
import { ChatEntity } from './chat.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('complain')
export class ComplainEntity extends BaseEntityRobusto {
  @Column('text')
  title!: string;

  @Column('text')
  description!: string;

  @Column('boolean')
  isClosed!: boolean;

  @OneToOne(() => ChatEntity, (chat: ChatEntity) => chat.complain, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  chat!: ChatEntity;

  @ManyToOne(() => SupportEntity, (support) => support.complains)
  support!: SupportEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.complains)
  userComplaining!: UserEntity;
}
