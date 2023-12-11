import { TId } from 'packages/robusto-crud/base-entity';
import { Except } from 'type-fest';
import { RemoveNever } from 'utils/types';

export type EntityWithoutRelations<T extends object> = RemoveNever<{
  [K in keyof T]: T[K] extends { id: TId } | { id: TId }[] ? never : T[K];
}>;

export type ExceptWithoutRelations<
  T extends object,
  Excepted extends keyof EntityWithoutRelations<T>,
> = Except<EntityWithoutRelations<T>, Excepted>;
