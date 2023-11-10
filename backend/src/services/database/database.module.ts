import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import { DatabaseService, dataSource } from './entities/database.service';
// import { DataSource } from 'typeorm';

// const DataSourcePerso = new DataSource({
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
// });
// console.log(process.env.POSTGRES_HOST);
// export const EntityManagerPerso = DataSourcePerso.manager;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options provided');
        }

        return dataSource.initialize();
      },
    }),
  ],
})
export class DatabaseModule {}

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });

// export const EntityManagerPerso = AppDataSource.manager;
// export const typeOrmConnectionDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
// });

// @Global()
// @Module({
//   imports: [],
//   providers: [
//     {
//       provide: DataSource,
//       useFactory: async () => {
//         await typeOrmConnectionDataSource.initialize();
//         return typeOrmConnectionDataSource;
//       },
//     },
//   ],
//   exports: [DataSource],
// })
// export class DatabaseModule {}

// export const EntityManagerPerso = typeOrmConnectionDataSource.manager;
