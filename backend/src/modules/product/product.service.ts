import { Model, Types } from 'mongoose';
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

  async findAllSliders(skip: number = 0, limit: number = 3): Promise<Product[]> {
    return await this.productModel.find(
      {
        sliderImage: { $ne: null }
      },
      null,
      { skip, limit }
    );
  }

  async update(id: string, updateProductDto: ProductDto): Promise<Product> {
    await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto
    );
    return this.productModel.findById(id);
  }

  async getCount(): Promise<number> {
    return this.productModel.count({});
  }

  async findRelatedProducts(id: string) {
    const { category, brand } = await this.productModel.findById(Types.ObjectId(id));

    const sameCategoryAndBrand = this.productModel.find(
      {
        _id: { $ne: id },
        category,
        brand
      }
    );
    const sameCategory = this.productModel.find(
      {
        _id: { $ne: id },
        category,
        brand: { $ne: brand }
      }
    );
    const sameBrand = this.productModel.find(
      {
        _id: { $ne: id },
        category: { $ne: category },
        brand
      }
    );

    return (await sameCategoryAndBrand)
      .concat(await sameCategory, await sameBrand);
  }
}
