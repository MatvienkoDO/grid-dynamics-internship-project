import { ProductModel } from '../productModel/productModel.entity';

interface Product {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  productModel: ProductModel;
}
