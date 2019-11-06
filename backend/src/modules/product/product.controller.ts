import { Controller, Post, Get, Patch, Body, Query, Param, HttpStatus, HttpException } from '@nestjs/common';

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

  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    const product = this.productService.findById(id);
    const response = new ProductResponse();
    try {
      response.data = await product;
    } catch (err) {
      // Mongoose returns an error with name CastError when document not found
      if (err.name = 'CastError') {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      } else {
        throw new Error(err);
      }
    }
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    const response = new ProductResponse();
    try {
      response.data = await this.productService.update(id, updateProductDto);
    } catch (err) {
      // Mongoose returns an error with name CastError when document not found
      if (err.name = 'CastError') {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      } else {
        throw new Error(err);
      }
    }
    return response;
  }

  @Get('for-slider')
  async findForSlider(@Query() query) {
    const products = this.productService.findAllSliders(Number(query.skip), Number(query.limit));

    const response = new ProductResponse();
    response.data = await products;
    
    return response;
  }
}
