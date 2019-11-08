import { Product } from './product'

export class ProductResponse {
  public data: Product | Product[];
  public quantity: number;
}
