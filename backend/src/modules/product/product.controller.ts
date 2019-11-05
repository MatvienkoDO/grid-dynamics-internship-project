import { Controller, Post, Get, Patch, Body, Query, Param } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.interface';
import { ProductResponse } from './product.response';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: ProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query) {
    const products = this.productService.findAll(Number(query.skip), Number(query.limit));
    const quantity = this.productService.getCount();

    const response = new ProductResponse();
    response.data = await products;
    response.quantity = await quantity;
    
    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
}
