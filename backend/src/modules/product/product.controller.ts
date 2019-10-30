import { Controller , Post, Get, Patch, Body, Query } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.interface';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query): Promise<Product[]> {
    return this.productService.findAll(+query.skip, +query.limit);
  }

  @Patch(':id')
  async update(id: string, @Body() updateProductDto: CreateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
}
