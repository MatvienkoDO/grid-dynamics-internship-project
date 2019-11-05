import { Controller, Post, Get, Patch, Body, Query, Param, Res, HttpStatus, HttpException } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.interface';
import { ProductResponse } from './product.response';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: ProductDto) {
    const response = new ProductResponse();
    response.data = await this.productService.create(createProductDto);
    return response;
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

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = this.productService.findById(id);
    const response = new ProductResponse();
    try {
      response.data = await product;
    } catch (err) {
      // FIXME: all possible exceptions from service will look like 'not found' even it is not such
      // err is not actually used
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    const response = new ProductResponse();
    try {
      response.data = await this.productService.update(id, updateProductDto);
    } catch (err) {
      // FIXME: all possible exceptions from service will look like 'not found' even it is not such
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return response;
  }
}
