import { Product } from './product';

export class ProductResponse {
  constructor(
    public readonly data?: Product | Product[],
    public readonly quantity?: number,
  ) { }
}
