import { Body, Controller, Get, Post } from '@nestjs/common';
import { robustoCrud } from '../../services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';
import { TId } from 'packages/robusto-crud/base-entity';
import typia, { createAssertEquals } from 'typia';
import { TypedParam, TypedRoute } from '@nestia/core';
import { SelectDto, UpdateDto } from '../../../packages/robusto-dto/types';

type UserSelectDto = SelectDto<UserEntity, 'password'>;
export type UserCreateDto = Pick<UserEntity, 'email' | 'password' | 'role'>;
type UserUpdateDto = UpdateDto<UserEntity>;

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
    if (data.role === 'admin') {
      throw new Error('forbidden');
    }
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
