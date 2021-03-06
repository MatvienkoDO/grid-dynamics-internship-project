export class Filter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  brands?: string[];

  constructor(
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    sizes?: string[],
    brands?: string[]
  ) {
    this.category = category;
    this.minPrice = minPrice,
    this.maxPrice = maxPrice,
    this.sizes = sizes,
    this.brands = brands
  }
}