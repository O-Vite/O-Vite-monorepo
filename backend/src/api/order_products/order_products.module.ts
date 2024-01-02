import { Module } from '@nestjs/common';
import { OrderProductsController } from './order_products.controller';

@Module({
  controllers: [OrderProductsController],
})
export class OrderProductsModule {}
