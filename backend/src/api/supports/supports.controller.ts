import { Body, Controller, Post, Get } from '@nestjs/common';
import { robustoCrud } from 'src/services/database/database.service';
import { SupportEntity } from 'src/services/database/entities/support.entity';
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

// type Obj2MustHaveKeysOfObj1<Obj1 extends object, Obj2 extends object> = {
//   [K in keyof Obj1]: K extends keyof Obj2 ? Obj2[K] : never;
// };
// type SupportCreateDto = RemoveNever<
//   Obj2MustHaveKeysOfObj1<
//     SupportEntity,
//     {
//       user: UserCreateDto;
//     }
//   >
// >;

type SelectSupportDto = SelectDto<SupportEntity>;

type InsertSupportDto = InsertDtoWithRelation<SupportEntity>;

type UpdateSupportDto = UpdateDtoWithRelation<SupportEntity>;

@Controller('supports')
export class SupportsController {
  private readonly crudator = robustoCrud({
    entityDB: SupportEntity,
    selectKeys: [...typia.misc.literals<keyof SelectSupportDto>()],
    assertSelectDto: createAssertEquals<SelectSupportDto>(),
    assertSelectDtoArray: createAssertEquals<SelectSupportDto[]>(),
    assertInsertDto: createAssertEquals<InsertSupportDto>(),
    assertUpdateDto: createAssertEquals<UpdateSupportDto>(),
  });

  @Get()
  async getAll() {
    return this.crudator.fetchAll();
  }

  @Post()
  async create(@Body() data: InsertSupportDto) {
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
  async update(@TypedParam('id') id: TId, @Body() data: UpdateSupportDto) {
    return this.crudator.patch(id, data);
  }
}
