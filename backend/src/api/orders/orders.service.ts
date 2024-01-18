import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../services/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderState } from '../../services/database/entities/order.entity';
import { DelivererEntity } from 'src/services/database/entities/deliverer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(DelivererEntity)
    private delivererRepository: Repository<DelivererEntity>,
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
    // Trouver le livreur par son userId
    const deliverer = await this.delivererRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!deliverer) {
      throw new Error('Livreur non trouvé !');
    }

    // Trouver la commande par son ID
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['deliverer'], // Chargez la relation si nécessaire
    });
    if (!order) {
      throw new Error('Commande non trouvée !');
    }

    // Mettre à jour la commande avec le deliverer
    order.deliverer = deliverer;
    await this.ordersRepository.save(order);

    return order;
  }

  async deliverOrder(orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error("La commande n'a pas été trouvée");
    }
    if (order.state !== OrderState.TAKEN) {
      throw new Error("L'état de la commande n'est pas bon");
    }
    order.state = OrderState.DELIVERED;
    await this.ordersRepository.save(order);
    return order;
  }
}

//   async findCurrentOrdersByUser(userId: string) {
//     return this.ordersRepository.find({
//       where: {
//         userId: userId,
//         state: OrderState.TAKEN,
//       },
//     });
