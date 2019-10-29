import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductModelService } from './productModel.service';
import { ProductModel } from './productModel.entity';

@Controller('productModels')
export class ProductModelController {
  constructor(private readonly productsService: ProductModelService) {}

  @Get()
  findAll(): Promise<ProductModel[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() productData) {
    return this.productsService.create(productData);
  }
}
