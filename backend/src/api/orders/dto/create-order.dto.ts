import {
  IsString,
  IsUUID,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';
import { OrderState } from '../order.entity';

export class CreateOrderDto {
  @IsString()
  deliveryAddress: string;

  @IsUUID()
  clientId: string;

  @IsEnum(OrderState)
  state: OrderState;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductDto[];

  constructor(
    deliveryAddress: string,
    clientId: string,
    state: OrderState,
    orderProducts: OrderProductDto[],
  ) {
    this.deliveryAddress = deliveryAddress;
    this.clientId = clientId;
    this.orderProducts = orderProducts;
    this.state = state;
  }
}
