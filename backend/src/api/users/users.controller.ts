import { Body, Controller, Get, Post } from '@nestjs/common';
import { Orm, robustoCrud } from '../../services/database/database.service';
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
  private readonly crudator = robustoCrud({
    entityDB: UserEntity,
    selectKeys: [...typia.misc.literals<keyof UserSelectDto>()],
    assertSelectDto: createAssertEquals<UserSelectDto>(),
    assertSelectDtoArray: createAssertEquals<UserSelectDto[]>(),
    assertInsertDto: createAssertEquals<UserCreateDto>(),
    assertUpdateDto: createAssertEquals<UserUpdateDto>(),
  });

  @Get()
  async getAll(): Promise<UserSelectDto[]> {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: UserCreateDto) {
    return this.crudator.insert(data);
  }

  @TypedRoute.Get(':id')
  async getById(@TypedParam('id') id: TId) {
    return this.crudator.fetchById(id);
  }

  @TypedRoute.Delete(':id')
  async delete(@TypedParam('id') id: TId) {
    return this.crudator.delete(id);
  }

  @TypedRoute.Patch(':id')
  async update(@TypedParam('id') id: TId, @Body() data: UserUpdateDto) {
    return this.crudator.patch(data);
  }
}
