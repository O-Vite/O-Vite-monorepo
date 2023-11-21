import { Article } from './articles.entity';
import { Controller, Param, Query } from '@nestjs/common';

import {
  Crudator,
  TObjectValueOperatorWhere,
} from '../crudator/service.crudator';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import typia, { IJsonApplication } from 'typia';
import { TId } from 'src/services/database/entities/user.entity';
import { TPagination } from '../crudator/where.crudator';

type TOmitStrict<T, K extends keyof T> = Omit<T, K>;

const genSwagger = typia.json.application;

const extractListKeyJsonAjv = <T>(json: IJsonApplication) => {
  const res = json.components.schemas;
  const keys = Object.keys(res!)[0];
  const ress = Object.keys(res![keys]?.['properties']);
  return typia.assertEquals<Array<keyof T>>(ress);
};

export type ArticleDto = TOmitStrict<Article, 'confidential' | 'content'>;
export type ArticleCreateDto = TOmitStrict<Article, 'id'>;
export type ArticleUpdateDto = Partial<ArticleCreateDto>;

const keysArticleDto = extractListKeyJsonAjv<ArticleDto>(
  genSwagger<[ArticleDto]>(),
);

export type ArticleDtoAdmin = TOmitStrict<Article, 'confidential' | 'content'>;
const keysArticleDtoAdmin = extractListKeyJsonAjv<ArticleDtoAdmin>(
  genSwagger<[ArticleDtoAdmin]>(),
);
// const xx = {} as ArticleDto;

// const structure: TCustomSetting<Article> = {
//   itemDb: Article,
//   itemDto: typia.createAssert<ArticleDto[]>(),
//   typeItemDto: xx,
// };

@Controller('articles/user')
export class ArticleControllerUser {
  private readonly crudator = new Crudator({
    entityDB: Article,
    selectKeys: keysArticleDto,
    selectDto: {} as ArticleDto,
    insertDto: {} as ArticleCreateDto,
    updateDto: {} as ArticleUpdateDto,
    wherePrefilter: [{ key: 'title', operator: 'Equal', value: 'matt' }],
  });

  @TypedRoute.Get()
  async getAll(
    @Query('filter') filter: string = '',
    @Query('pagination') pagination: string = '',
  ): Promise<ArticleDto[]> {
    return this.crudator.fetchAll(filter, pagination);
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

// @Controller('articles/admin')
// export class ArticleControllerAdmin {
//   private readonly crudator = new Crudator(Article, keysArticleDtoAdmin);

//   @TypedRoute.Get()
//   async getAllAdminn(): Promise<ArticleDtoAdmin[]> {
//     return 0 as any;
//   }
// }
