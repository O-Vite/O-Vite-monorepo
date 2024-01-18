import {
  BaseEntityRobusto,
  TId,
  TOmitBaseEntity,
} from 'packages/robusto-crud/base-entity';
import { Except, PartialOnUndefinedDeep, SetOptional } from 'type-fest';
import { RemoveNever } from 'utils/types';

export type EntityWithoutRelations<
  T extends TOmitBaseEntity<BaseEntityRobusto>,
> = RemoveNever<{
  [K in keyof T]: T[K] extends BaseEntityRobusto | BaseEntityRobusto[]
    ? never
    : T[K];
}>;

export type EntityWithOptionnalRelationsAndNestedWithoutRelations<
  T extends TOmitBaseEntity<BaseEntityRobusto>,
> = PartialOnUndefinedDeep<
  RemoveNever<{
    [K in keyof T]: T[K] extends BaseEntityRobusto[]
      ? EntityWithoutRelations<T[K][number]>[] | undefined
      : T[K] extends BaseEntityRobusto
        ? EntityWithoutRelations<TOmitBaseEntity<T[K]>> | undefined
        : T[K];
  }>
>;

export type ExceptWithoutRelations<
  T extends TOmitBaseEntity<BaseEntityRobusto>,
  Excepted extends keyof EntityWithoutRelations<T> = never,
> = Except<EntityWithoutRelations<T>, Excepted>;

export type ExceptWithOptionnalRelationsAndNestedWithoutRelations<
  T extends TOmitBaseEntity<BaseEntityRobusto>,
  Excepted extends
    keyof EntityWithOptionnalRelationsAndNestedWithoutRelations<T> = never,
> = Except<EntityWithOptionnalRelationsAndNestedWithoutRelations<T>, Excepted>;

export type SelectDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<T> = never,
> = ExceptWithoutRelations<T, Excepted>;

export type InsertDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<TOmitBaseEntity<T>> = never,
> = ExceptWithoutRelations<TOmitBaseEntity<T>, Excepted>;

export type InsertDtoWithRelation<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithOptionnalRelationsAndNestedWithoutRelations<
    TOmitBaseEntity<T>
  > = never,
> = ExceptWithOptionnalRelationsAndNestedWithoutRelations<
  TOmitBaseEntity<T>,
  Excepted
>;

export type UpdateDto<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithoutRelations<TOmitBaseEntity<T>> = never,
> = ExceptWithoutRelations<TOmitBaseEntity<T>, Excepted>;

export type UpdateDtoWithRelation<
  T extends BaseEntityRobusto,
  Excepted extends keyof EntityWithOptionnalRelationsAndNestedWithoutRelations<
    TOmitBaseEntity<T>
  > = never,
> = ExceptWithOptionnalRelationsAndNestedWithoutRelations<
  TOmitBaseEntity<T>,
  Excepted
>;
