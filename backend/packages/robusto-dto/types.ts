import {
  BaseEntityRobusto,
  TId,
  TOmitBaseEntity,
} from 'packages/robusto-crud/base-entity';
import { Except } from 'type-fest';
import { RemoveNever } from 'utils/types';

export type EntityWithoutRelations<T extends object> = RemoveNever<{
  [K in keyof T]: T[K] extends { id: TId } | { id: TId }[] ? never : T[K];
}>;

export type ExceptWithoutRelations<
  T extends object,
  Excepted extends keyof EntityWithoutRelations<T> = never,
> = Except<EntityWithoutRelations<T>, Excepted>;

export type SelectDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<T> = never,
> = ExceptWithoutRelations<T, Excepted>;

export type InsertDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<TOmitBaseEntity<T>> = never,
> = ExceptWithoutRelations<TOmitBaseEntity<T>, Excepted>;

export type UpdateDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<TOmitBaseEntity<T>> = never,
> = ExceptWithoutRelations<TOmitBaseEntity<T>, Excepted>;
