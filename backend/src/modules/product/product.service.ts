import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async create(createCatDto: ProductDto): Promise<Product> {
    const createdCat = new this.productModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(skip: number = 0, limit: number = 4): Promise<Product[]> {
    return await this.productModel.find(
      null,
      null,
      { skip, limit }
    ).exec();
  }

  async update(id: string, updateProductDto: ProductDto): Promise<Product> {
    await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto
    );
    return this.productModel.findById(id);
  }
}
