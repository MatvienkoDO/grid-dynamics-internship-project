import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async create(createCatDto: ProductDto): Promise<Product> {
    const createdCat = new this.productModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(skip: number = 0, limit: number = 4): Promise<Product[]> {
    return await this.productModel.find(
      null,
      null,
      { skip, limit }
    );
  }

  async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async findAllBestSales(skip: number = 0, limit: number = 3): Promise<Product[]> {
    return await this.productModel.find(
      null,
      null,
      { skip, limit }
    );
  }
}


