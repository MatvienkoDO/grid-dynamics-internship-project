import { Product } from './product.interface'

export class ProductResponse {
  public data: Product | Product[];
  public quantity: number;

  constructor(data?: Product | Product[], quantity?: number) {
    this.data = data;
    this.quantity = quantity;
  }
}
