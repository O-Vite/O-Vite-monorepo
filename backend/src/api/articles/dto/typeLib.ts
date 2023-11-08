import typia from 'typia';
import { Article } from '../articles.entity';

type TControllerSettings<Role extends string, EntityDB extends TClass> = {
  insertDto: TFnDto | TDtoPerRole<Role>;
  updateDto: TFnDto | TDtoPerRole<Role>;
  itemDto: TFnDto | TDtoPerRole<Role>;
  prefilter: TPrefilterPerRole<Role, EntityDB>;
};

type SettingsController<T extends TClass> = TControllerSettings<ERole, TClass>;

type TFnDto = (item: string) => object;
type TClass = object;
type TPreFilter<EntityDb extends TClass> = any;
type TRequirement = string;
type TDto_And_Requirement = {
  dto: TFnDto;
  requirement?: TRequirement;
};
type TDtoPerRole<Role extends string> = {
  [key in Role]: TFnDto | TDto_And_Requirement;
};
type TPrefilterPerRole<Role extends string, EntityDB extends TClass> = {
  [key in Role]: TPreFilter<EntityDB>;
};

type ERole = 'admin' | 'user';

// const res = typia.json.assertParse<Article[]>;
// const rr = typia.json.createAssertParse<Article[]>;
