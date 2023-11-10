// import { BaseEntity } from './baseEntity';
// import { TId } from 'src/services/database/entities/user.entity';
// import { DeepPartial } from 'typeorm';
// import { GenericService } from './genericService';
// import { Body, Delete, Get, Post, Put } from '@nestjs/common';
// import { TypedParam } from '@nestia/core';
// import { TCustomSetting } from '../articles/dto/typeLib';

// export class BaseController<T extends BaseEntity = BaseEntity> {
//   private readonly genericService: GenericService<T>;
//   constructor(private readonly structure: TCustomSetting<T>) {
//     this.genericService = new GenericService(structure);
//   }
//   @Get()
//   protected async getAll() {
//     return this.genericService.fetchAll();
//   }
//   // @Get(':id')
//   // protected async getById(@TypedParam('id') id: TId) {
//   //   return this.genericService.fetchById(id);
//   // }
//   // @Post()
//   // protected async create(@Body() entity: DeepPartial<BaseEntity>) {
//   //   return this.genericService.insert(entity);
//   // }
//   // @Delete(':id')
//   // protected async delete(@TypedParam('id') id: TId) {
//   //   this.genericService.delete(id);
//   // }
//   // @Put(':id')
//   // protected async update(
//   //   @TypedParam('id') id: TId,
//   //   @Body() entity: DeepPartial<BaseEntity>,
//   // ) {
//   //   return this.genericService.patch(id, entity);
//   // }
// }
