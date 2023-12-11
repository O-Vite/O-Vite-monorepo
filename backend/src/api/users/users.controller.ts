import { Body, Controller, Get, Post } from '@nestjs/common';
import { Orm, robustoCrud } from '../../services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { TId, TOmitBaseEntity } from 'packages/robusto-crud/base-entity';
import typia, { assert, createAssert, createAssertEquals } from 'typia';
import { TypedParam, TypedRoute } from '@nestia/core';
import { Except } from 'type-fest';
import { RobustoHelper } from 'packages/robusto-crud/helpers';
import { RemoveNever } from 'utils/types';
import { ExceptWithoutRelations } from 'packages/robusto-dto/types';

type UserSelectDto = ExceptWithoutRelations<UserEntity, 'password'>;
type UserCreateDto = Pick<UserEntity, 'email' | 'password' | 'role'>;
type UserUpdateDto = TOmitBaseEntity<UserEntity>;

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

  @TypedRoute.Patch()
  async update(@TypedParam('id') id: TId, @Body() data: UserUpdateDto) {
    return this.crudator.patch(id, data);
  }
}
