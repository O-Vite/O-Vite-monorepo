import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
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

  // @Post('/accept/:orderId')
  // @UseGuards(AuthGuard)
  // acceptOrder(@Param('orderId') orderId: string, @Req() req: Request) {
  //   const delivererId = req.user?.userId; // Assurez-vous que l'utilisateur est authentifié et dispose d'un userId
  //   return this.ordersService.acceptOrder(orderId, delivererId);
  // }
}
