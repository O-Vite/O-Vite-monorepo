import { RequiredDeep } from 'type-fest';
import typia, { tags, misc } from 'typia';

// -> lib //
type DTO<Token extends PropertyKey> = {
  readonly aa: { [K in Token]: void };
};

type No_Insert = DTO<'NO_INSERT'>;
type No_Update = DTO<'NO_UPDATE'>;
type No_Select = DTO<'NO_SELECT'>;

type DtoPerRole<T extends string> = {
  NO_INSERT: DTO<T> & No_Insert;
  NO_UPDATE: DTO<T> & No_Update;
  NO_SELECT: DTO<T> & No_Select;
};

type FullResultGlobal<Entity extends object, T extends DtoPerRole<any>> = {
  insert: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_INSERT']
      ? never
      : K]: Entity[K];
  };
  update: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_UPDATE']
      ? never
      : K]: Entity[K];
  };
  select: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_SELECT']
      ? never
      : K]: Entity[K];
  };
};

type FullResultGlobalWithArray<
  Entity extends object,
  T extends DtoPerRole<any>,
> = {
  insert: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_INSERT']
      ? never
      : K]: Entity[K];
  }[];
  update: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_UPDATE']
      ? never
      : K]: Entity[K];
  }[];
  select: keyof {
    [K in keyof Entity as Entity[K] extends T['NO_SELECT']
      ? never
      : K]: Entity[K];
  }[];
};

// <- lib //

interface User {
  id: number;
  email: string & Admin['NO_INSERT'];
  password: string & (Admin['NO_UPDATE'] & Admin['NO_SELECT']);
}

type Admin = DtoPerRole<'ADMIN'>;
type Client = DtoPerRole<'CLIENT'>;

type ObjectInsertUpdateSelectUnion<
  T extends FullResultGlobal<object, DtoPerRole<any>>,
> = {
  insert: (keyof T['insert'])[];
  update: (keyof T['update'])[];
  select: (keyof T['select'])[];
};

type AdminConfigWithArrayValue = {
  insert: AdminConfig['insert'][];
  update: AdminConfig['update'][];
  select: AdminConfig['select'][];
};

const fn = (item: AdminConfigWithArrayValue) => item;

type AdminConfig = FullResultGlobal<User, Admin>;
const rrr = typia.misc.literals<AdminConfig['insert']>();

fn({
  insert: typia.misc.literals<AdminConfig['insert']>(),
  update: typia.misc.literals<AdminConfig['update']>(),
  select: typia.misc.literals<AdminConfig['select']>(),
});

//typia.misc.literals<keyof FullResultAdmin['insert']>();
