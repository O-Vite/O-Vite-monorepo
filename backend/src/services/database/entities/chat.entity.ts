import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { MessageEntity } from './message.entity';
import { ComplainEntity } from './complain.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('chat')
export class ChatEntity extends BaseEntityRobusto {
  @OneToMany(() => MessageEntity, (message) => message.chat, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  messages!: MessageEntity[];

  @OneToOne(() => ComplainEntity, (complain) => complain.chat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  complain!: ComplainEntity;
}
