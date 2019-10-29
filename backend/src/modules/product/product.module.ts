import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductModel } from '../productModel/productModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductModel])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
