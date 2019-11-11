import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { ProductDto } from './dto/product.dto';
import { Filter } from './filter.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async create(createCatDto: ProductDto): Promise<Product> {
    const createdCat = new this.productModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(skip: number = 0, limit: number = 4, filter?: Filter): Promise<Product[]> {
    const query = this.productModel.find(null, null, { skip, limit });
    if (filter) {
      if (filter.category) {
        query.where('category').equals(filter.category);
      }
      if (Number.isInteger(filter.minPrice)) {
        query.where('price').gte(filter.minPrice);
      }
      if (Number.isInteger(filter.maxPrice)) {
        query.where('price').lte(filter.maxPrice);
      }
      if (filter.brands) {
        query.where('brand').in(filter.brands);
      }
      if (filter.sizes) {
        query.where('sizes').elemMatch({ $in: filter.sizes });
      }
    }
    return await query;
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

  async getCount(filter?: Filter): Promise<number> {
    const query = this.productModel.count(null);
    if (filter) {
      if (filter.category) {
        query.where('category').equals(filter.category);
      }
      if (Number.isInteger(filter.minPrice)) {
        query.where('price').gte(filter.minPrice);
      }
      if (Number.isInteger(filter.maxPrice)) {
        query.where('price').lte(filter.maxPrice);
      }
      if (filter.brands) {
        query.where('brand').in(filter.brands);
      }
      if (filter.sizes) {
        query.where('sizes').elemMatch({ $in: filter.sizes });
      }
    }
    return query;
  }
}


