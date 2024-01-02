import { Module } from '@nestjs/common';
import { ComplainsController } from './complains.controller';

@Module({
  controllers: [ComplainsController],
})
export class ComplainsModule {}
