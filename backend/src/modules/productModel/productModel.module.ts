import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModelService } from './productModel.service';
import { ProductModelController } from './productModel.controller';
import { ProductModel } from './productModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  providers: [ProductModelService],
  controllers: [ProductModelController],
})
export class ProductModelModule {}
