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
import { ChatEntity } from 'src/services/database/entities/chat.entity';

type SelectChatDto = SelectDto<ChatEntity>;
type InsertChatDto = InsertDtoWithRelation<ChatEntity>;
type UpdateChatDto = UpdateDtoWithRelation<ChatEntity>;

@Controller('chats')
export class ChatsController {
  private readonly crudator = robustoCrud({
    entityDB: ChatEntity,
    selectKeys: [...typia.misc.literals<keyof SelectChatDto>()],
    assertSelectDto: createAssertEquals<SelectChatDto>(),
    assertSelectDtoArray: createAssertEquals<SelectChatDto[]>(),
    assertInsertDto: createAssertEquals<InsertChatDto>(),
    assertUpdateDto: createAssertEquals<UpdateChatDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertChatDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateChatDto) {
    return this.crudator.patch(id, data);
  }
}
