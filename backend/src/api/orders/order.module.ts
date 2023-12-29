import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { OrderProductEntity } from '../../services/database/entities/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderProductEntity])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrderModule {}
