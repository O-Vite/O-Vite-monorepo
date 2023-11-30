import { Injectable } from '@nestjs/common';
import {
  type TypeOrmModuleOptions,
  type TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import 'dotenv/config';

console.log(process.env.POSTGRES_USERNAME);
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
} as any);

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return dataSource.options;
  }
}
