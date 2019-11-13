import { LocalizedProduct } from './localizedProduct.model';

export class ProductResponse {
  public data: LocalizedProduct | LocalizedProduct[];
  public quantity: number;

  constructor(
    data?: LocalizedProduct | LocalizedProduct[],
    quantity?: number
  ) {
    this.data = data;
    this.quantity = quantity;
  }
}
