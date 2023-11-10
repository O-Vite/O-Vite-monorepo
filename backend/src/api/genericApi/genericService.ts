// import { TId } from 'src/services/database/entities/user.entity';
// import { DeepPartial, ObjectType } from 'typeorm';
// import { BaseEntity } from './baseEntity';
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { dataSource } from 'src/services/database/entities/database.service';
// import { TCustomSetting } from '../articles/dto/typeLib';
// import typia from 'typia';
// import { ArticleDto } from '../articles/articles.controller';

// @Injectable()
// export class GenericService<T extends BaseEntity> {
//   private EM = dataSource.manager;
//   private entityDb: ObjectType<T>;
//   constructor(private readonly structure: TCustomSetting<T>) {
//     this.entityDb = structure.itemDb;
//   }

//   async fetchAll(): Promise<NonNullable<typeof this.structure.typeItemDto>[]> {
//     //@ts-ignore
//     const ress = typia.json.application<[ArticleDto], 'ajv'>().components
//       ?.schemas!['ArticleDto'];

//     //@ts-ignore
//     console.log(Object.keys(ress.properties));

//     const res = await this.EM.find(this.entityDb, {
//       //@ts-ignore
//       select: Object.keys(ress.properties),
//     });
//     // return this.structure.itemDto(res);

//     return res;
//   }

//   async fetchById(id: TId) {
//     return this.EM.findOneBy<ObjectType<T>>(this.entityDb, { id });
//   }

//   async insert(data: DeepPartial<BaseEntity>) {
//     return this.EM.save(this.entityDb, data as T);
//   }

//   async delete(id: TId) {
//     return this.EM.delete(this.entityDb, id);
//   }

//   async patch(id: TId, data: DeepPartial<BaseEntity>) {
//     const isExists = this.fetchById(id) !== null;

//     if (!isExists) {
//       throw new NotFoundException("Entity doesn't exist");
//     }

//     this.EM.update<ObjectType<T>>(this.entityDb, id, data);
//   }

//   // async fetchById(id: TId) {
//   //   return this.EM.findOneBy(this.EntityDb, { id });
//   // }

//   // async insert(data: DeepPartial<BaseEntity>) {
//   //   return this.EM.save(this.EntityDb, data);
//   // }

//   // async delete(id: TId) {
//   //   await this.EM.delete(this.EntityDb, id);
//   // }

//   // async patch(id: TId, data: DeepPartial<BaseEntity>) {
//   //   const isExists = (await this.fetchById(id)) !== null;

//   //   if (!isExists) {
//   //     throw new NotFoundException("Entity doesn't exist");
//   //   }

//   //   this.EM.update(this.EntityDb, id, data);
//   // }
// }
