import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import typia, { createAssertEquals } from 'typia';
import { InsertDto, SelectDto, UpdateDto } from 'packages/robusto-dto/types';
import { TypedParam, TypedRoute } from '@nestia/core';
import { TId } from 'packages/robusto-crud/base-entity';
import { OrderProductEntity } from 'src/services/database/entities/order_product.entity';

type SelectOrderProductsDto = SelectDto<OrderProductEntity>;
type InsertOrderProductsDto = InsertDto<OrderProductEntity>;
type UpdateOrderProductsDto = UpdateDto<OrderProductEntity>;

@Controller('order_products')
export class OrderProductsController {
  private readonly crudator = robustoCrud({
    entityDB: OrderProductEntity,
    selectKeys: [...typia.misc.literals<keyof SelectOrderProductsDto>()],
    assertSelectDto: createAssertEquals<SelectOrderProductsDto>(),
    assertSelectDtoArray: createAssertEquals<SelectOrderProductsDto[]>(),
    assertInsertDto: createAssertEquals<InsertOrderProductsDto>(),
    assertUpdateDto: createAssertEquals<UpdateOrderProductsDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertOrderProductsDto) {
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
  async update(
    @TypedParam('id') id: TId,
    @Body() data: UpdateOrderProductsDto,
  ) {
    return this.crudator.patch(id, data);
  }
}
