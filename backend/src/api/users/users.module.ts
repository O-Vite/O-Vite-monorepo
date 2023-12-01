import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDb } from 'src/services/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDb])],
  controllers: [UsersController],
})
export class UsersModule {}
