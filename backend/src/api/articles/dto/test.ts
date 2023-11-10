// // import api from 'src/apiGenerated';
// // import typia from 'typia';
// // import { Article } from '../articles.entity';
// // import { JsonObject } from 'type-fest';

// // const rr = await api.functional.articles.getAll(1);

// // const res = typia.json.createAssertParse<Article[]>()(rr)

// import { Entity, Fields, remult } from 'remult';
// import api from 'src/apiGenerated';

// const rr = api.functional.articles.getAll({ host: 'google.fr' });

// @Entity('products', {
//   allowApiCrud: true,
// })
// export class Product {
//   @Fields.uuid()
//   id!: string;

//   @Fields.string()
//   name = '';

//   @Fields.number()
//   unitPrice = 0;

//   static findAll(): Promise<ProductDto[]> {
//     return remult.repo(Product).find();
//   }
// }

// type ProductDto = Omit<Product, 'id'>;

// const productsRepo = remult.repo(Product);

// const mm = Product.findAll();
