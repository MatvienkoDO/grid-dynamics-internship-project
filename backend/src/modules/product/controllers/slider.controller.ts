import { Controller, Get, Query } from '@nestjs/common';

import { ProductService } from '../product.service';
import { ProductResponse } from '../product.response';

@Controller('api/slider-products')
export class SliderController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query) {
    const products = this.productService.findAllSliders(Number(query.skip), Number(query.limit));

    const response = new ProductResponse();
    response.data = await products;
    
    return response;
  }
}
