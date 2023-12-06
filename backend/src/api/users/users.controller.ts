import { TDtoPerRole } from 'packages/robusto-dto';
// import { robustoCrud } from './../../services/database/database.service';
import { Body, Controller, Get } from '@nestjs/common';
// import { TOmitBaseEntity } from 'packages/robusto-crud/base-entity';

// import { UserDb } from 'src/services/database/entities/user.entity';
// import typia from 'typia';
// import { TOmit } from 'utils/types';
// import { Except } from 'type-fest';
import { Orm, robustoCrud } from '../../services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { TId, TOmitBaseEntity } from 'packages/robusto-crud/base-entity';
import typia, { assert, createAssert } from 'typia';
import {} from '@nestia/core';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Except } from 'type-fest';
import { RobustoHelper } from 'packages/robusto-crud/helpers';
import { createAssertStringify } from 'typia/lib/json';

type UserSelectDto = Except<UserEntity, 'complains' | 'password' | 'role'>;
type UserCreateDto = Pick<UserEntity, 'email' | 'password'>;
// type UserUpdateDto = Partial<UserCreateDto>;

type RemoveKeysWithValueObjectOrArrayObject<T extends object> = {
  [K in keyof T]: T[K] extends { id: TId } | { id: TId }[] ? never : T[K];
};

type buildObjectWithoutValueNever<T extends object> = {
  [K in keyof T]: T[K] extends never ? never : K;
};
type RESS = RemoveKeysWithValueObjectOrArrayObject<UserEntity>;

// type Res2 = RemoveNever<RESS>;

@Controller('users')
export class UsersController {
  // private readonly crudator = robustoCrud({
  //   entityDB: UserEntity,
  //   selectKeys: typia.misc.literals<keyof UserDto>(),
  //   selectDto: {} as UserDto,
  //   insertDto: {} as UserCreateDto,
  //   updateDto: {} as UserUpdateDto,
  //   wherePrefilter: [],
  // });

  @TypedRoute.Get()
  async getAll(): Promise<UserSelectDto[]> {
    return RobustoHelper.fetchAll(Orm, {
      entityDB: UserEntity,
      selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
      assertSelectDto: createAssert<UserSelectDto[]>(),
    });
  }

  @TypedRoute.Post()
  async create(@Body() data: UserCreateDto[]) {
    return RobustoHelper.insert(
      Orm,
      {
        entityDB: UserEntity,
        selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
        assertSelectDto: createAssert<UserSelectDto[]>(),
        assertInsertDto: createAssert<UserCreateDto[]>(),
        uniqueKeys: ['email'],
      },
      data,
    );
  }
}

// import type { Paths, ValueOf } from 'type-fest';
// import { assert } from 'typia';
// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: {
//     e: 4,
//     f: 5,
//     g: 6,
//   },
// };

// type convertClassToObject<T> = {
//   [K in keyof T]: T[K];
// };

// type mm = convertClassToObject<UserDto>;

// type Res = Paths<mm>;

// type Remove
