import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import typia, { createAssertEquals } from 'typia';
import { InsertDto, SelectDto, UpdateDto } from 'packages/robusto-dto/types';
import { TypedParam, TypedRoute } from '@nestia/core';
import { TId } from 'packages/robusto-crud/base-entity';
import { ProductEntity } from 'src/services/database/entities/product.entity';
import { DelivererEntity } from 'src/services/database/entities/deliverer.entity';

type SelectDelivererDto = SelectDto<DelivererEntity>;
type InsertDelivererDto = InsertDto<DelivererEntity>;
type UpdateDelivererDto = UpdateDto<DelivererEntity>;

@Controller('deliverers')
export class DeliverersController {
  private readonly crudator = robustoCrud({
    entityDB: DelivererEntity,
    selectKeys: [...typia.misc.literals<keyof SelectDelivererDto>()],
    assertSelectDto: createAssertEquals<SelectDelivererDto>(),
    assertSelectDtoArray: createAssertEquals<SelectDelivererDto[]>(),
    assertInsertDto: createAssertEquals<InsertDelivererDto>(),
    assertUpdateDto: createAssertEquals<UpdateDelivererDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertDelivererDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateDelivererDto) {
    return this.crudator.patch(id, data);
  }
}
