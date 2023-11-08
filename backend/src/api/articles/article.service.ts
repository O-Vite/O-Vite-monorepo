import { BaseService } from 'src/generic/base.service';
import { Article } from './articles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly repositoryy: Repository<Article>,
  ) {
    super(repositoryy);
  }
}
