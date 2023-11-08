import { Article } from '../articles.entity';

export const removeKeys = <T extends object, U extends keyof T>(
  obj: T,
  keys: U[],
): Omit<T, U> => {
  const copy = { ...obj };
  keys.forEach((key) => {
    delete copy[key];
  });
  return copy;
};

export type ArticleDto = Omit<Article, 'confidential' | 'id'>;
export type ArticleDtoBis = Omit<Article, 'confidential' | 'content'>;

export const toArticleDto = (article: Article): ArticleDto => {
  const { confidential, id, ...dto } = article;
  return dto;
};

export const toArticleDtoBis = (article: Article): ArticleDtoBis => {
  return removeKeys(article, ['confidential', 'content']);
};
