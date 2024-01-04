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

type SelectProductDto = SelectDto<ProductEntity>;
type InsertProductsDto = InsertDtoWithRelation<ProductEntity>;
type UpdateProductsDto = UpdateDtoWithRelation<ProductEntity>;

@Controller('products')
export class ProductsController {
  private readonly crudator = robustoCrud({
    entityDB: ProductEntity,
    selectKeys: [...typia.misc.literals<keyof SelectProductDto>()],
    assertSelectDto: createAssertEquals<SelectProductDto>(),
    assertSelectDtoArray: createAssertEquals<SelectProductDto[]>(),
    assertInsertDto: createAssertEquals<InsertProductsDto>(),
    assertUpdateDto: createAssertEquals<UpdateProductsDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertProductsDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateProductsDto) {
    return this.crudator.patch(id, data);
  }
}
