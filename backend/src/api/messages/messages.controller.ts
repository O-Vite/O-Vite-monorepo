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
import { MessageEntity } from 'src/services/database/entities/message.entity';

type SelectMessageDto = SelectDto<MessageEntity>;
type InsertMessagesDto = InsertDtoWithRelation<MessageEntity>;
type UpdateMessagesDto = UpdateDtoWithRelation<MessageEntity>;

@Controller('messages')
export class MessagesController {
  private readonly crudator = robustoCrud({
    entityDB: MessageEntity,
    selectKeys: [...typia.misc.literals<keyof SelectMessageDto>()],
    assertSelectDto: createAssertEquals<SelectMessageDto>(),
    assertSelectDtoArray: createAssertEquals<SelectMessageDto[]>(),
    assertInsertDto: createAssertEquals<InsertMessagesDto>(),
    assertUpdateDto: createAssertEquals<UpdateMessagesDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertMessagesDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateMessagesDto) {
    return this.crudator.patch(id, data);
  }
}
