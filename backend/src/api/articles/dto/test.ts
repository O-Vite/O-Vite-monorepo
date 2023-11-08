import api from 'src/apiGenerated';
import typia from 'typia';
import { Article } from '../articles.entity';

const rr = await api.functional.articles.getAll(1);

const res = typia.json.assertParse<Article[]>;
