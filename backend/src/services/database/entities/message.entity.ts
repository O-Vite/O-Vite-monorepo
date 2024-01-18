import { Entity, ManyToOne } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from './user.entity';
import { BaseEntityRobusto } from 'packages/robusto-crud/base-entity';

@Entity('message')
export class MessageEntity extends BaseEntityRobusto {
  @ManyToOne(() => ChatEntity, (chat: ChatEntity) => chat.messages)
  chat!: ChatEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.messages)
  user!: UserEntity;
}
