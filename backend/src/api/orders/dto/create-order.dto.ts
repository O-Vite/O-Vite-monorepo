import {
  IsString,
  IsUUID,
  ValidateNested,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';
import { OrderState } from '../../../services/database/entities/order.entity';

export class CreateOrderDto {
  @IsString()
  address: string;

  @IsUUID()
  clientId: string;

  @IsUUID()
  userId: string;

  @IsEnum(OrderState)
  state: OrderState;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductDto[];

  constructor(
    address: string,
    clientId: string,
    state: OrderState,
    userId: string,
    orderProducts: OrderProductDto[],
  ) {
    this.address = address;
    this.userId = userId;
    this.orderProducts = orderProducts;
    this.state = state;
    this.clientId = clientId;
  }
}
