import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../services/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

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
      where: { client: { id: userId } },
    });
  }
  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { client: { id: userId } },
    });
  }
}
