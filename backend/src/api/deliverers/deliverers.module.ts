import { Module } from '@nestjs/common';
import { DeliverersController } from './deliverers.controller';

@Module({
  controllers: [DeliverersController],
})
export class DeliverersModule {}
