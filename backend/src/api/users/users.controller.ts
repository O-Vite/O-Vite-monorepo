import { Body, Controller, Get } from '@nestjs/common';
import { Orm } from '../../services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { TId } from 'packages/robusto-crud/base-entity';
import typia, { assert, createAssert, createAssertEquals } from 'typia';
import { TypedParam, TypedRoute } from '@nestia/core';
import { Except } from 'type-fest';
import { RobustoHelper } from 'packages/robusto-crud/helpers';

type UserSelectDto = Except<
  UserEntity,
  'complains' | 'password' | 'role' | 'messages'
>;
type UserCreateDto = Pick<UserEntity, 'email' | 'password' | 'role'>;
type UserUpdateDto = Partial<UserCreateDto> & { id: TId };

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
      assertSelectDto: createAssertEquals<UserSelectDto[]>(),
    });
  }

  @TypedRoute.Post()
  async create(@Body() data: UserCreateDto) {
    return RobustoHelper.insert(
      Orm,
      {
        entityDB: UserEntity,
        selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
        assertSelectDto: createAssertEquals<UserSelectDto>(),
        assertInsertDto: createAssertEquals<UserCreateDto>(),
      },
      data,
    );
  }

  @TypedRoute.Get(':id')
  async getById(@TypedParam('id') id: TId) {
    return RobustoHelper.fetchById(
      Orm,
      {
        entityDB: UserEntity,
        selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
        assertSelectDto: createAssertEquals<UserSelectDto>(),
      },
      id,
    );
  }

  @TypedRoute.Delete(':id')
  async delete(@TypedParam('id') id: TId) {
    return RobustoHelper.deleteItem(
      Orm,
      {
        entityDB: UserEntity,
      },
      id,
    );
  }

  @TypedRoute.Patch(':id')
  async update(@TypedParam('id') id: TId, @Body() data: UserUpdateDto) {
    //TODO: patch doesn't work (return not good as select full entity)
    return RobustoHelper.patch(
      Orm,
      {
        entityDB: UserEntity,
        selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
        assertSelectDto: createAssertEquals<UserSelectDto>(),
        assertUpdateDto: createAssertEquals<UserUpdateDto>(),
      },
      { ...data },
    );
  }
}
