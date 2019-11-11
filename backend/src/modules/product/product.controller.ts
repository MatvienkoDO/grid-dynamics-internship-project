import { Controller, Post, Get, Patch, Body, Query, Headers, Param, HttpStatus, HttpException } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductResponse } from './product.response';
import { Filter } from './filter.model';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Headers() headers, @Body() createProductDto: ProductDto) {
    const data = await this.productService.create(createProductDto, headers.locale);
    return new ProductResponse(data);
  }

  @Get()
  async findAll(@Headers() headers, @Query() query) {
    const filter = new Filter(
      query.category,
      Number(query.minPrice),
      Number(query.maxPrice),
      query.sizes,
      query.brands
    );
    const products = this.productService.findAll(Number(query.skip), Number(query.limit), headers.locale, filter);
    const quantity = this.productService.getCount(filter);
    return new ProductResponse(await products, await quantity);
  }

  @Get('by-id/:id')
  async findById(@Headers() headers, @Param('id') id: string) {
    const product = this.productService.findById(id, headers.locale);
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
  async update(@Headers() headers, @Param('id') id: string, @Body() updateProductDto: ProductDto) {
    try {
      const data = await this.productService.update(id, headers.locale, updateProductDto);
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
    async findAllBestSales(@Headers() headers, @Query() query) {
    return this.productService.findAll(Number(query.skip), Number(query.limit), headers.locale);
  }

  @Get('for-slider')
  async findForSlider(@Headers() headers, @Query() query) {
    const products = this.productService.findAllSliders(Number(query.skip), Number(query.limit), headers.locale);

    return new ProductResponse(await products);
  }

  @Get('related/:id')
  async findRelatedProducts(@Headers() headers, @Param('id') id: string) {
    const data = await this.productService.findRelatedProducts(id, headers.locale);
    return new ProductResponse(data);
  }
}
