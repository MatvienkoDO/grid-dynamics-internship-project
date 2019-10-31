import { Controller, Post, Get, Patch, Body, Query, Param } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.interface';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: ProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query): Promise<Product[]> {
    return this.productService.findAll(Number(query.skip), Number(query.limit));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
}
