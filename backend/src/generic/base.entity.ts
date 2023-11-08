import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TId } from 'src/services/database/entities/user.entity';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: TId;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
