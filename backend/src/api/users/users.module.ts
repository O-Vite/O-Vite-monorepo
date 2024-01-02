import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserDb } from 'src/services/database/entities/_user.entity';
import { UsersController } from './users.controller';
import { DelivererModule } from '../delivers/deliver.module';

@Module({
  controllers: [UsersController],
  imports: [DelivererModule],
})
export class UsersModule {}
