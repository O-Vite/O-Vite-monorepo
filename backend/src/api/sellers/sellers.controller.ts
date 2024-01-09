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
import { SellerEntity } from 'src/services/database/entities/seller.entity';
import * as bcrypt from 'bcrypt';

type SelectSellersDto = SelectDto<SellerEntity>;
type InsertSellersDto = InsertDtoWithRelation<SellerEntity>;
type UpdateSellersDto = UpdateDtoWithRelation<SellerEntity>;

@Controller('sellers')
export class SellersController {
  private readonly crudator = robustoCrud({
    entityDB: SellerEntity,
    selectKeys: [...typia.misc.literals<keyof SelectSellersDto>()],
    assertSelectDto: createAssertEquals<SelectSellersDto>(),
    assertSelectDtoArray: createAssertEquals<SelectSellersDto[]>(),
    assertInsertDto: createAssertEquals<InsertSellersDto>(),
    assertUpdateDto: createAssertEquals<UpdateSellersDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertSellersDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateSellersDto) {
    return this.crudator.patch(id, data);
  }
}
