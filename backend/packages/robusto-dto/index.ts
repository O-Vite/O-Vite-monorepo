import { literals } from 'typia/lib/misc';

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

type GeneralConfigWithArrayValue<
  T extends FullResultGlobal<any, DtoPerRole<any>>,
> = {
  insert: [T['insert']];
  update: [T['update']];
  select: [T['select']];
};

const fn = <T extends FullResultGlobal<any, DtoPerRole<any>>>(
  item: GeneralConfigWithArrayValue<T>,
) => item;

// <- lib //

interface User {
  id: number;
  email: string & Admin['NO_INSERT'];
  password: string & (Admin['NO_UPDATE'] & Admin['NO_SELECT']);
}

type Admin = DtoPerRole<'ADMIN'>;
// type Client = DtoPerRole<'CLIENT'>;

type AdminConfig = AdminGeneratorConfig<User>;

type AdminGeneratorConfig<T extends object> = FullResultGlobal<T, Admin>;

fn<AdminConfig>({
  insert: literals<AdminConfig['insert']>(),
  update: literals<AdminConfig['update']>(),
  select: literals<AdminConfig['select']>(),
});
