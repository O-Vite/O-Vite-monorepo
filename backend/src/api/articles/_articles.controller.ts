// import { Controller } from '@nestjs/common';
// import { BaseController } from '../genericApi/baseController';
// import { Article } from './articles.entity';
// import { TClass } from 'utils/types';

// // import { TypedParam, TypedRoute } from '@nestia/core';
// // import { TId } from 'src/services/database/entities/user.entity';
// // import { Article } from './articles.entity';
// // import { ArticleDto, ArticleDtoBis } from './dto/article.dto';

// // import { assert } from 'typia';
// // export const ff: TClass<Article> = Article;
// // @Controller('articles')
// export class ArticleController extends BaseController<Article> {
//   constructor() {
//     super(Article);
//   }
//   constructor(private readonly articleService: ArticleService) {}
//   @TypedRoute.Get()
//   async getAll() {
//     return this.articleService.fetchAll();
//   }
//   @TypedRoute.Get(':id')
//   async getById(@TypedParam('id') id: TId) {
//     // const data: number = 1;
//     const res = await this.articleService.fetchById(id);
//     // console.log(Object.keys(res?.updatedAt));
//     // const st = stringify(res);
//     // return assertParse<ArticleDto | null>(st);
//     return assert<ArticleDtoBis | null>(res);
//     // return res;
//     // if (res === null) return null;
//     // if (data === 1) {
//     //   return toArticleDto(res);
//     // } else {
//     //   return toArticleDtoBis(res);
//     // }
//   }
//   @TypedRoute.Post()
//   async create() {
//     return this.articleService.insert(new Article());
//   }
//   @TypedRoute.Put(':id')
//   async update(@TypedParam('id') id: TId) {
//     return this.articleService.patch(id, new Article());
//   }
//   @TypedRoute.Delete(':id')
//   async delete(@TypedParam('id') id: TId) {
//     return this.articleService.delete(id);
//   }
// }
