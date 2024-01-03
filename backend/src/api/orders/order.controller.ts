// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, Get, Param, UseGuards, Request} from '@nestjs/common';
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

  @Post('/accept/:orderId')
  @UseGuards(AuthGuard)
  async acceptOrder(@Param('orderId') orderId: string, @Request() req) {
    const userId = req.user.id;
    return this.ordersService.acceptOrder(orderId, userId);
  }
}
