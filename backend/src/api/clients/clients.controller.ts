import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import typia, { createAssertEquals } from 'typia';
import {
  InsertDto,
  InsertDtoWithRelation,
  SelectDto,
  UpdateDto,
  UpdateDtoWithRelation,
} from 'packages/robusto-dto/types';
import { TypedParam, TypedRoute } from '@nestia/core';
import { TId } from 'packages/robusto-crud/base-entity';
import { ClientEntity } from 'src/services/database/entities/client.entity';
import * as bcrypt from 'bcrypt';

type SelectClientDto = SelectDto<ClientEntity>;
type InsertClientDto = InsertDtoWithRelation<ClientEntity>;
type UpdateClientDto = UpdateDtoWithRelation<ClientEntity>;

@Controller('clients')
export class ClientsController {
  private readonly crudator = robustoCrud({
    entityDB: ClientEntity,
    selectKeys: [...typia.misc.literals<keyof SelectClientDto>()],
    assertSelectDto: createAssertEquals<SelectClientDto>(),
    assertSelectDtoArray: createAssertEquals<SelectClientDto[]>(),
    assertInsertDto: createAssertEquals<InsertClientDto>(),
    assertUpdateDto: createAssertEquals<UpdateClientDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertClientDto) {
    if (data?.user?.role === 'admin') {
      throw new Error('forbidden');
    }
    if (data.user) {
      data.user.password = await bcrypt.hash(data.user.password, 10);
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateClientDto) {
    return this.crudator.patch(id, data);
  }
}
