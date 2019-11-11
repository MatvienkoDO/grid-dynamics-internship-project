import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { LocalizedProduct } from './localizedProduct.model'
import { ProductDto } from './dto/product.dto';
import { Filter } from './filter.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async create(createProductDto: ProductDto, locale: string = 'en'): Promise<LocalizedProduct> {
    const createdProduct = new this.productModel(createProductDto);
    return this.getLocalizedProduct(locale, await createdProduct.save());
  }

  async findAll(
    skip: number = 0,
    limit: number = 4,
    locale: String = 'en',
    filter?: Filter
  ): Promise<LocalizedProduct[]> {
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
    const products = await query;
    return this.getLocalizedProducts(locale, products);
  }

  async findById(id: string, locale: string = 'en'): Promise<LocalizedProduct> {
    return this.getLocalizedProduct(locale, await this.productModel.findById(id));
  }

  async findAllBestSales(skip: number = 0, limit: number = 3, locale: string = 'en'): Promise<LocalizedProduct[]> {
    const bestSalesProducts = await this.productModel.find(
      null,
      null,
      { skip, limit }
    );
    return this.getLocalizedProducts(locale, bestSalesProducts);
  }

  async findAllSliders(skip: number = 0, limit: number = 3, locale: string = 'en'): Promise<LocalizedProduct[]> {
    const productsForSlider = await this.productModel.find(
      {
        sliderImage: { $ne: null }
      },
      null,
      { skip, limit }
    );
    return this.getLocalizedProducts(locale, productsForSlider);
  }

  async update(
    id: string,
    locale: string = 'en',
    updateProductDto: ProductDto
  ): Promise<LocalizedProduct> {
    await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto
    );
    return this.getLocalizedProduct(locale, await this.productModel.findById(id));
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

  private getLocalizedProducts(locale: String = 'en', dbProducts: Product[]): LocalizedProduct[] {
    const result = [];
    for (const dbProduct of dbProducts) {
      result.push(this.getLocalizedProduct(locale, dbProduct));
    }
    return result;
  }

  private getLocalizedProduct(locale: String = 'en', dbProduct: Product): LocalizedProduct {
    let localeName = null;
    for (const elem of dbProduct.name) {
      if (elem.locale === locale) {
        localeName = elem.value;
        break;
      }
    }
    let localeSubtitle = null;
    for (const elem of dbProduct.subtitle) {
      if (elem.locale === locale) {
        localeSubtitle = elem.value;
        break;
      }
    }
    let localeDescription = null;
    for (const elem of dbProduct.description) {
      if (elem.locale === locale) {
        localeDescription = elem.value;
        break;
      }
    }
    return new LocalizedProduct(
      dbProduct.id,
      localeName,
      localeSubtitle,
      localeDescription,
      dbProduct.category,
      dbProduct.brand,
      dbProduct.price,
      dbProduct.sizes,
      dbProduct.colors,
      dbProduct.images
    );
  }
}


