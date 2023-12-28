import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productService.findAll();
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
