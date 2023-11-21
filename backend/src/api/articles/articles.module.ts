import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles.entity';
import { ArticleControllerUser } from './articles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleControllerUser],
})
export class ArticleModule {}
