import { Article } from './articles.entity';
import { Controller, Param, Query } from '@nestjs/common';

import {
  Crudator,
  TObjectValueOperatorWhere,
} from '../crudator/service.crudator';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import typia, { IJsonApplication, tags } from 'typia';
import { TId } from 'src/services/database/entities/user.entity';
import { TPagination } from '../crudator/where.crudator';
import { TOmitBaseEntity } from '../genericApi/baseEntity';
import { EntityManager } from 'typeorm';

type TOmitStrict<T, K extends keyof T> = Omit<T, K>;

const genSwagger = typia.json.application;

const extractListKeyJsonAjv = <T>(json: IJsonApplication) => {
  const res = json.components.schemas;
  const keys = Object.keys(res!)[0];
  const ress = Object.keys(res![keys]?.['properties']);
  return typia.assertEquals<Array<keyof T>>(ress);
};

export type ArticleDto = TOmitStrict<Article, 'confidential' | 'content'>;
export type ArticleCreateDto = TOmitBaseEntity<Article>;
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

const sayhello = () => 'hello';

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

  // @TypedRoute.Get('hello')
  // async sayHello(
  //   @TypedQuery() operator: { operator: boolean | string },
  // ): Promise<1> {
  //   console.log(operator);
  //   return 1;
  // }

  @TypedRoute.Get()
  async getAll(
    @Query('filter') filter: string = '',
    @Query('pagination') pagination: string = '',
  ): Promise<ArticleDto[]> {
    const res = await this.crudator.fetchAll(filter, pagination);
    // //@ts-ignore
    // console.log(typia.json.assertStringify<Date>(res[0].createdAt));
    //@ts-ignore
    return res;
    // return res.map((x) => ({
    //   ...x,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }));
  }

  @TypedRoute.Post('aa')
  async getPostTest(test: TObjectValueOperatorWhere<Article>): Promise<null> {
    //@ts-ignore
    return null;
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

const fn = (str: number) => str;

type ExtractType<T> = T extends (arg: infer U) => any ? U : never;
type Res = ExtractType<typeof fn>;

interface User {
  name: string;
  animal: {
    name: string;
  };
}

type KeysOfNestedKeyObject<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

type Res22 = KeysOfNestedKeyObject<User>;

const fn = (str: number) => str;

fn("f")