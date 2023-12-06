import { TDtoPerRole } from 'packages/robusto-dto';
// import { robustoCrud } from './../../services/database/database.service';
import { Controller, Get } from '@nestjs/common';
// import { TOmitBaseEntity } from 'packages/robusto-crud/base-entity';

// import { UserDb } from 'src/services/database/entities/user.entity';
// import typia from 'typia';
// import { TOmit } from 'utils/types';
// import { Except } from 'type-fest';
import { Orm, robustoCrud } from '../../services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { TOmitBaseEntity } from 'packages/robusto-crud/base-entity';
import typia, { assert, createAssert } from 'typia';
import {} from '@nestia/core';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Except } from 'type-fest';
import { RobustoHelper } from 'packages/robusto-crud/helpers';
import { createAssertStringify } from 'typia/lib/json';

type UserSelectDto = Except<UserEntity, 'complains' | 'messages'>;
// type UserCreateDto = TOmitBaseEntity<UserEntity>;
// type UserUpdateDto = Partial<UserCreateDto>;

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

  @Get()
  async getAll(): Promise<UserSelectDto[]> {
    return RobustoHelper.fetchAll(Orm, {
      entityDB: UserEntity,
      selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
    });
  }
}

// import type { Paths, ValueOf } from 'type-fest';
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
