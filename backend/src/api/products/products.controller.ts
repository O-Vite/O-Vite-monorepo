import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
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
      throw new NotFoundException('Produit non trouvé');
    }
    return product;
  }
}
