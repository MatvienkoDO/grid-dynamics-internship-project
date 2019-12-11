import { LocalizedProduct } from './localizedProduct.model';

export class ProductResponse {
  public readonly data: LocalizedProduct | LocalizedProduct[];
  public readonly quantity?: number;

  constructor(
    data: LocalizedProduct | LocalizedProduct[],
    quantity?: number,
  ) {
    this.data = data;
    this.quantity = quantity;
  }
}
