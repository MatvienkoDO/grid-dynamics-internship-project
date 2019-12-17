import { Product } from './product';

export class ProductResponse {
  public data: Product | Product[];
  public quantity: number;

  constructor(data?: Product | Product[], quantity?: number) {
    if (data && quantity) {
      this.data = data;
      this.quantity = quantity;
    }
  }
}
