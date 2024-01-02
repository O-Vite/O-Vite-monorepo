import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import typia, { createAssertEquals } from 'typia';
import { InsertDto, SelectDto, UpdateDto } from 'packages/robusto-dto/types';
import { TypedParam, TypedRoute } from '@nestia/core';
import { TId } from 'packages/robusto-crud/base-entity';
import { BrandEntity } from 'src/services/database/entities/brand.entity';

type SelectBrandDto = SelectDto<BrandEntity>;
type InsertBrandDto = InsertDto<BrandEntity>;
type UpdateBrandDto = UpdateDto<BrandEntity>;

@Controller('brands')
export class BrandsController {
  private readonly crudator = robustoCrud({
    entityDB: BrandEntity,
    selectKeys: [...typia.misc.literals<keyof SelectBrandDto>()],
    assertSelectDto: createAssertEquals<SelectBrandDto>(),
    assertSelectDtoArray: createAssertEquals<SelectBrandDto[]>(),
    assertInsertDto: createAssertEquals<InsertBrandDto>(),
    assertUpdateDto: createAssertEquals<UpdateBrandDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertBrandDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateBrandDto) {
    return this.crudator.patch(id, data);
  }
}
