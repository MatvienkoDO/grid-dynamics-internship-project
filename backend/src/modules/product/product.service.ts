import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.interface';
import { LocalizedProduct } from './localizedProduct.model';
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
    locale: string = 'en',
    filter: Filter = {},
  ): Promise<LocalizedProduct[]> {
    const conditions = filter.search
      ? { $text: { $search: filter.search }}
      : null;
    const projection = filter.search
      ? { score: { $meta: 'textScore' } }
      : null;
    const options = { skip, limit };

    const query = this.productModel.find(conditions, projection, options);

    if (filter.category) {
      query.where('category').equals(filter.category);
    }
    if (filter.minPrice !== undefined && Number.isInteger(filter.minPrice)) {
      query.where('price').gte(filter.minPrice);
    }
    if (filter.maxPrice !== undefined && Number.isInteger(filter.maxPrice)) {
      query.where('price').lte(filter.maxPrice);
    }
    if (filter.brands) {
      query.where('brand').in(filter.brands);
    }
    if (filter.sizes) {
      query.where('sizes').elemMatch({ $in: filter.sizes });
    }
    if (filter.search) {
      query.sort({ score: { $meta: 'textScore' }});
    }

    const products = await query;

    return this.getLocalizedProducts(locale, products);
  }

  async findById(id: string, locale: string = 'en'): Promise<LocalizedProduct | null> {
    const product: Product | null = await this.productModel.findById(id);
    if (!product) {
      return null;
    }

    return this.getLocalizedProduct(locale, product);
  }

  async findAllBestSales(
    skip: number = 0,
    limit: number = 3,
    locale: string = 'en',
  ): Promise<LocalizedProduct[]> {

    const bestSalesProducts = await this.productModel.find(null, null, { skip, limit });

    return this.getLocalizedProducts(locale, bestSalesProducts);
  }

  async findAllHotDealsMonth(
    skip: number = 0,
    limit: number = 6,
    locale: string = 'en',
  ): Promise<LocalizedProduct[]> {

    const hotDealsMonthProducts = await this.productModel.find(null, null,
       { skip: Number(skip), limit: Number(limit) });

    return this.getLocalizedProducts(locale, hotDealsMonthProducts);
  }

  async findAllHotDealsWeek(
    skip: number = 0,
    limit: number = 8,
    locale: string = 'en',
  ): Promise<LocalizedProduct[]> {
    const hotDealsWeekProducts = await this.productModel.find(null, null,
      { skip: Number(skip), limit: Number(limit) });

    return this.getLocalizedProducts(locale, hotDealsWeekProducts);
  }

  async findAllSliders(
    skip: number = 0,
    limit: number = 3,
    locale: string = 'en',
  ): Promise<LocalizedProduct[]> {

    const conditions = {
      sliderImage: {
        $ne: null,
      },
    };
    const options = {
      skip,
      limit,
    };

    const productsForSlider = await this.productModel.find(conditions, null, options);

    return this.getLocalizedProducts(locale, productsForSlider);
  }

  async update(
    id: string,
    locale: string = 'en',
    updateProductDto: ProductDto,
  ): Promise<LocalizedProduct | null> {

    const options = {
      new: true,
    };

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, options);

    if (!updatedProduct) {
      return null;
    }

    return this.getLocalizedProduct(locale, updatedProduct);
  }

  async getCount(filter: Filter = {}): Promise<number> {
    const searchConditions = {
      $text: {
        $search: filter.search,
      },
    };
    const conditions = filter.search ? searchConditions : null;

    const query = this.productModel.countDocuments(conditions);

    if (filter.category) {
      query.where('category').equals(filter.category);
    }
    if (filter.minPrice !== undefined && Number.isInteger(filter.minPrice)) {
      query.where('price').gte(filter.minPrice);
    }
    if (filter.maxPrice !== undefined && Number.isInteger(filter.maxPrice)) {
      query.where('price').lte(filter.maxPrice);
    }
    if (filter.brands) {
      query.where('brand').in(filter.brands);
    }
    if (filter.sizes) {
      query.where('sizes').elemMatch({ $in: filter.sizes });
    }

    return query;
  }

  private getLocalizedProducts(locale: string = 'en', dbProducts: Product[]): LocalizedProduct[] {
    return dbProducts
      .map(product => this.getLocalizedProduct(locale, product));
  }

  private getLocalizedProduct(requiredLocale: string = 'en', dbProduct: Product): LocalizedProduct {

    const bySpecifiedLocale = ({ locale }) => locale === requiredLocale;
    const byDefaultLocale = ({ locale }) => locale === 'en';
    const defaultValue = '';

    const name = dbProduct.name.find(bySpecifiedLocale)?.value
      ?? dbProduct.name.find(byDefaultLocale)?.value
      ?? defaultValue;

    const subtitle = dbProduct.subtitle.find(bySpecifiedLocale)?.value
      ?? dbProduct.subtitle.find(byDefaultLocale)?.value
      ?? defaultValue;

    const description = dbProduct.description.find(bySpecifiedLocale)?.value
      ?? dbProduct.description.find(byDefaultLocale)?.value
      ?? defaultValue;

    return new LocalizedProduct(
      dbProduct.id,
      name,
      subtitle,
      description,
      dbProduct.category,
      dbProduct.brand,
      dbProduct.price,
      dbProduct.sizes,
      dbProduct.colors,
      dbProduct.images,
      dbProduct.sliderImage,
    );
  }

  async findRelatedProducts(
    id: string,
    locale: string = 'en',
  ): Promise<LocalizedProduct[] | null> {
    const product: Product | null = await this.productModel.findById(Types.ObjectId(id));

    if (!product) {
      return null;
    }

    const { category, brand } = product;

    const sameCategoryAndBrand = this.productModel.find(
      {
        _id: { $ne: id },
        category,
        brand,
      },
    );
    const sameCategory = this.productModel.find(
      {
        _id: { $ne: id },
        category,
        brand: { $ne: brand },
      },
    );
    const sameBrand = this.productModel.find(
      {
        _id: { $ne: id },
        category: { $ne: category },
        brand,
      },
    );

    const related = (await sameCategoryAndBrand).concat(await sameCategory, await sameBrand);

    return this.getLocalizedProducts(locale, related);
  }
}
