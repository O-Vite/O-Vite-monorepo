import { Injectable } from '@nestjs/common';
import {
  type TypeOrmModuleOptions,
  type TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { DataSource, Entity } from 'typeorm';
import 'dotenv/config';
import { useRobustoCrud } from 'packages/robusto-crud/service';

console.log(process.env.POSTGRES_USERNAME);
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as any);

export const Orm = dataSource.manager;

export const robustoCrud = useRobustoCrud(dataSource.manager);

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return dataSource.options;
  }
}
