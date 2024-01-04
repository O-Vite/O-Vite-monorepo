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
import { ProductEntity } from 'src/services/database/entities/product.entity';
import { ComplainEntity } from 'src/services/database/entities/complain.entity';

type SelectComplainDto = SelectDto<ComplainEntity>;
type InsertComplainDto = InsertDtoWithRelation<ComplainEntity>;
type UpdateComplainDto = UpdateDtoWithRelation<ComplainEntity>;

@Controller('complains')
export class ComplainsController {
  private readonly crudator = robustoCrud({
    entityDB: ComplainEntity,
    selectKeys: [...typia.misc.literals<keyof SelectComplainDto>()],
    assertSelectDto: createAssertEquals<SelectComplainDto>(),
    assertSelectDtoArray: createAssertEquals<SelectComplainDto[]>(),
    assertInsertDto: createAssertEquals<InsertComplainDto>(),
    assertUpdateDto: createAssertEquals<UpdateComplainDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertComplainDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateComplainDto) {
    return this.crudator.patch(id, data);
  }
}
