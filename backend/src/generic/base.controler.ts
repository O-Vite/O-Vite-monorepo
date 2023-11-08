// import { BaseEntity } from './base.entity';

// // import { Get } from '@nestjs/common';

// export class BaseController<T extends BaseEntity> {
//   constructor(private readonly BaseService: IBaseService<T>) {}

//   // @TypedRoute.Get()
//   // async getAll(): Promise<T[]> {
//   //   return this.BaseService.fetchAll();
//   // }

//   // @TypedRoute.Get<T>(':id')
//   // // @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
//   // // @ApiResponse({ status: 404, description: 'Entity does not exist' })
//   // async getById(@TypedParam('id') id: TId): Promise<T | null> {
//   //   return this.BaseService.fetchById(id);
//   // }

//   // @Post()
//   // // @ApiResponse({
//   // //   status: 201,
//   // //   description: 'The record has been successfully created.',
//   // // })
//   // // @ApiResponse({ status: 403, description: 'Forbidden.' })
//   // // @ApiResponse({ status: 400, description: 'Bad Request.' })
//   // async create(@Body() entity: QueryDeepPartialEntity<T>): Promise<T> {
//   //   return this.BaseService.insert(entity as T);
//   // }

//   // @TypedRoute.Delete(':id')
//   // // @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
//   // // @ApiResponse({ status: 400, description: 'Bad Request.' })
//   // async delete(@TypedParam('id') id: TId): Promise<void> {
//   //   this.BaseService.delete(id);
//   // }

//   // @TypedRoute.Put('/:id')
//   // // @ApiResponse({ status: 400, description: 'Bad Request.' })
//   // // @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
//   // async update(
//   //   @TypedParam('id') id: TId,
//   //   @Body() entity: QueryDeepPartialEntity<T>,
//   // ): Promise<void> {
//   //   return this.BaseService.patch(id, entity);
//   // }
// }
