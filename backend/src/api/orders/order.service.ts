import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../services/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderState } from '../../services/database/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    await this.ordersRepository.save(order);
    return order;
  }
  async findAllByUser(userId: string) {
    return this.ordersRepository.find({
      where: { userId: userId },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  async findAllAvailable() {
    return this.ordersRepository.find({
      where: { state: OrderState.NOT_TAKEN },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  async acceptOrder(orderId: string, userId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error('Order not found');
    }
    order.state = OrderState.TAKEN;
    await this.ordersRepository.save(order);
    return order;
  }
}
