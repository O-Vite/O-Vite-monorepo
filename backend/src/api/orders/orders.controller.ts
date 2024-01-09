// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, Get, Param, UseGuards, Request, Patch} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../../services/guard/auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('/user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.ordersService.findAllByUser(userId);
  }

  @Get('/available')
  @UseGuards(AuthGuard)
  findAllAvailable() {
    return this.ordersService.findAllAvailable();
  }

  // ACCEPTATION DES COMMANDES COTE LIVREUR
  @Post('/accept/:orderId')
  @UseGuards(AuthGuard)
  async acceptOrder(@Param('orderId') orderId: string, @Request() req) {
    const delivererId = req.user.id;
    return this.ordersService.acceptOrder(orderId, delivererId);
  }

  // LIVRAISON DE COMMANDES COTE LIVREUR | LA COMMANDE EST ACCEPTÉE
  @Patch('/deliver/:orderId')
  @UseGuards(AuthGuard)
  async deliverOrder(@Param('orderId') orderId: string) {
    return this.ordersService.deliverOrder(orderId);
  }
}

// AFFICHER LES COMMANDES COTE CLIENT
// @Get('/current/:userId')
// @UseGuards(AuthGuard)
// async findCurrentOrders(@Param('userId') userId: string) {
//   return this.ordersService.findCurrentOrdersByUser(userId);
// }
