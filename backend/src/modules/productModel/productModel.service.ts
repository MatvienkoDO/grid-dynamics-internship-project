import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductModel } from './productModel.entity';
import { CreateProductModelDto } from './dto/create-productModel.dto';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productModelRepository: Repository<ProductModel>,
  ) {}

  findAll(): Promise<ProductModel[]> {
    
    return this.productModelRepository.find();
  }

  async create(productModelData: CreateProductModelDto): Promise<ProductModel> {
    const productModel = new ProductModel();
    productModel.name = productModelData.name;
    productModel.description = productModelData.description;
    productModel.category = productModelData.category;
    productModel.brand = productModelData.brand;
    productModel.products = [];

    const newProduct = await this.productModelRepository.save(productModel);
    return newProduct;
  }
}
