import { Except } from 'type-fest';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { tags } from 'typia';
import { ExceptWithoutRelations } from 'packages/robusto-dto/types';

const TransformDate = {
  from(value: Date | null) {
    return value?.toISOString();
  },
  to(value: string) {
    return value;
  },
};

export type TId = string & tags.Format<'uuid'>;

export type TBaseEntityRobusto = {
  id: TId;
};

export class BaseEntityRobusto {
  @PrimaryGeneratedColumn('uuid')
  id!: TId;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public createdAt!: string & tags.Format<'date-time'>;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    transformer: TransformDate,
  })
  public updatedAt!: string & tags.Format<'date-time'>;
}

// type DEFAULT = TDtoPerRole<'DEFAULT'>;

export type TOmitBaseEntity<
  T extends BaseEntityRobusto,
  K extends keyof Except<T, keyof BaseEntityRobusto> = never,
> = Except<Except<T, keyof BaseEntityRobusto>, K>;
