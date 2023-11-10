import { BaseEntity } from 'src/api/genericApi/baseEntity';
import { ObjectType } from 'typeorm';
import { TClass } from 'utils/types';

type TSettingControllerBase<Role extends string, EntityDB extends TClass> = {
  insertDto: TFnDto<EntityDB> | TDtoPerRole<EntityDB, Role>;
  updateDto: TFnDto<EntityDB> | TDtoPerRole<EntityDB, Role>;
  itemDto: TFnDto<EntityDB> | TDtoPerRole<EntityDB, Role>;
  prefilter?: TPrefilterPerRole<Role, EntityDB>;
};

type TFnDto<T> = (item: T) => T;
type TDtoPerRole<T, Role extends string> = {
  [key in Role]: TFnDto<T> | TDto_And_Requirement<T>;
};
type TDto_And_Requirement<T> = {
  dto: TFnDto<T>;
  requirement?: TRequirement;
};

type TRequirement = string;

type TPrefilterPerRole<Role extends string, EntityDB extends TClass> = {
  [key in Role]: TPreFilter<EntityDB>;
};

type TPreFilter<EntityDb extends TClass> = [
  keyof EntityDb,
  TOperatorWhere,
  TValueOperatorWhere,
];
type TOperatorWhere =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'in'
  | 'notIn';

type TValueOperatorWhere = string | number | boolean;
/////
type ERole = 'admin' | 'user';

type TSettingController<T extends TClass> = TSettingControllerBase<ERole, T>;

// const res = typia.json.assertParse<Article[]>;
// const rr = typia.json.createAssertParse<Article[]>;

export type TCustomSetting<EntityDB extends BaseEntity> = {
  itemDb: ObjectType<EntityDB>;
  itemDto: TFnDto<Partial<ObjectType<EntityDB>>>;
  typeItemDto: Partial<EntityDB>;
};

export const rrr: ObjectType<BaseEntity> = BaseEntity;
