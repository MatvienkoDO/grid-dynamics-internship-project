import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Query,
  Headers,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductResponse } from './product.response';
import { Filter } from './filter.model';
import * as constants from '../../shared/constants';

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
      query.brands,
      query.search,
    );

    const quantity = this.productService.getCount(filter);
    const products = this.productService
      .findAll(Number(query.skip), Number(query.limit), headers.locale, filter);

    return new ProductResponse(await products, await quantity);
  }

  @Get('by-id/:id')
  async findById(@Headers() headers, @Param('id') id: string) {
    const product = await this.productService.findById(id, headers.locale);

    if (!product) {
      throw new HttpException({
        status: constants.incorrectIdStatus,
      }, HttpStatus.BAD_REQUEST);
    }

    return new ProductResponse(product);
  }

  @Patch(':id')
  async update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
  ) {
    const updatedProduct = await this.productService.update(id, headers.locale, updateProductDto);

    if (!updatedProduct) {
      throw new HttpException({
        status: constants.incorrectIdStatus,
      }, HttpStatus.BAD_REQUEST);
    }

    return new ProductResponse(updatedProduct);
  }

  @Get('best-sales')
    async findAllBestSales(@Headers() headers, @Query() query) {
    return this.productService.findAll(Number(query.skip), Number(query.limit), headers.locale);
  }

  @Get('hot-deals-month')
    async findAllHotDealsMonth(@Headers() headers, @Query() query) {
    const products = this.productService.findAllHotDealsMonth(query.skip,
            query.limit, headers.locale);

    return new ProductResponse(await products);
  }

  @Get('hot-deals-week')
    async findAllHotDealsWeek(@Headers() headers, @Query() query) {
    const products = this.productService.findAllHotDealsWeek(query.skip,
             query.limit, headers.locale);

    return new ProductResponse(await products);
  }

  @Get('for-slider')
  async findForSlider(@Headers() headers, @Query() query) {
    const products = this.productService
      .findAllSliders(Number(query.skip), Number(query.limit), headers.locale);

    return new ProductResponse(await products);
  }

  @Get('related/:id')
  async findRelatedProducts(@Headers() headers, @Param('id') id: string) {
    const related = await this.productService.findRelatedProducts(id, headers.locale);

    return new ProductResponse([]);
  }
}
