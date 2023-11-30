import { Article } from './articles.entity';
import { Controller } from '@nestjs/common';

import { Crudator } from '../../../packages/robusto-crud/service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import typia from 'typia';
import { TId, TOmitBaseEntity } from 'packages/robusto-crud/base-entity';

export type ArticleDto = Omit<Article, 'confidential' | 'content'>;
export type ArticleCreateDto = TOmitBaseEntity<Article>;
export type ArticleUpdateDto = Partial<ArticleCreateDto>;

@Controller('articles/user')
export class ArticleControllerUser {
  private readonly crudator = new Crudator({
    entityDB: Article,
    selectKeys: typia.misc.literals<keyof ArticleDto>(),
    selectDto: {} as ArticleDto,
    insertDto: {} as ArticleCreateDto,
    updateDto: {} as ArticleUpdateDto,
    wherePrefilter: [],
  });

  @TypedRoute.Get()
  async getAll(): Promise<ArticleDto[]> {
    return this.crudator.fetchAll();
  }

  @TypedRoute.Get(':id')
  async getById(@TypedParam('id') id: TId): Promise<ArticleDto | null> {
    return this.crudator.fetchById(id);
  }

  @TypedRoute.Post('/bulk/fetchById')
  async bulkFetchById(
    @TypedBody() json: { ids: TId[] },
  ): Promise<ArticleDto[]> {
    return this.crudator.bulkFetchById(json.ids);
  }

  @TypedRoute.Post()
  async create(@TypedBody() entity: ArticleCreateDto[]): Promise<ArticleDto[]> {
    return this.crudator.insert(entity);
  }

  @TypedRoute.Patch(':id')
  async update(
    @TypedParam('id') id: TId,
    @TypedBody() entity: ArticleUpdateDto,
  ): Promise<void> {
    return this.crudator.patch(id, entity);
  }

  @TypedRoute.Delete(':id')
  async delete(@TypedParam('id') id: TId): Promise<void> {
    return this.crudator.delete(id);
  }
}
