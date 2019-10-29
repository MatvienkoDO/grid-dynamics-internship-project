import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from '../productModel/productModel.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductModel)
    private readonly productModelRepository: Repository<ProductModel>,
  ) {}

  findAll(offset: number = 0, limit: number = 4): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['productModel'],
      skip: offset,
      take: limit,
    });
  }

  async create(productData: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = productData.name;
    product.size = productData.size;
    product.color = productData.color;
    product.price = productData.price;
    const productModel = await this.productModelRepository.findOne(productData.productModelId);
    product.productModel = productModel;

    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }
}
