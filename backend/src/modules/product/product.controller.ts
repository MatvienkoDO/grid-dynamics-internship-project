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
    const data = await this.productService.create(createProductDto);
    const response = new ProductResponse(data);
    return response;
  }

  @Get()
  async findAll(@Query() query) {
    const products = this.productService.findAll(Number(query.skip), Number(query.limit));
    const quantity = this.productService.getCount();

    return new ProductResponse(await products, await quantity);
  }

  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    const product = this.productService.findById(id);
    try {
      return new ProductResponse(await product);
    } catch (err) {
      // Mongoose returns an error with name CastError when document not found
      if (err.name === 'CastError') {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    try {
      const data = await this.productService.update(id, updateProductDto);
      return new ProductResponse(data);
    } catch (err) {
      // Mongoose returns an error with name CastError when document not found
      if (err.name === 'CastError') {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }
      
      throw err;
    }
  }

  @Get('best-sales')
    async findAllBestSales(@Query() query) {
    return this.productService.findAll(Number(query.skip), Number(query.limit));
  }

  @Get('for-slider')
  async findForSlider(@Query() query) {
    const products = this.productService.findAllSliders(Number(query.skip), Number(query.limit));

    return new ProductResponse(await products);
  }
}
