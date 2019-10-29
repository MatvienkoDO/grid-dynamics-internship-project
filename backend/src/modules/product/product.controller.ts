import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  findAll(@Query() query): Promise<Product[]> {
    if (query.offset && query.limit) {
      return this.productsService.findAll(+query.offset, +query.limit);
    }
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }
}
