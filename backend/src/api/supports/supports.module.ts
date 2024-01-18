import { Module } from '@nestjs/common';

import { SupportsController } from './supports.controller';

@Module({
  controllers: [SupportsController],
})
export class SupportsModule {}
