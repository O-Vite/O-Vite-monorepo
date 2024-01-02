import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import typia, { createAssertEquals } from 'typia';
import { InsertDto, SelectDto, UpdateDto } from 'packages/robusto-dto/types';
import { TypedParam, TypedRoute } from '@nestia/core';
import { TId } from 'packages/robusto-crud/base-entity';
import { OrderEntity } from 'src/services/database/entities/order.entity';

type SelectOrderDto = SelectDto<OrderEntity>;

type InsertOrderDto = InsertDto<OrderEntity>;

type UpdateOrderDto = UpdateDto<OrderEntity>;
//

@Controller('orders')
export class OrdersController {
  private readonly crudator = robustoCrud({
    entityDB: OrderEntity,
    selectKeys: [...typia.misc.literals<keyof SelectOrderDto>()],
    assertSelectDto: createAssertEquals<SelectOrderDto>(),
    assertSelectDtoArray: createAssertEquals<SelectOrderDto[]>(),
    assertInsertDto: createAssertEquals<InsertOrderDto>(),
    assertUpdateDto: createAssertEquals<UpdateOrderDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertOrderDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateOrderDto) {
    return this.crudator.patch(id, data);
  }
}
