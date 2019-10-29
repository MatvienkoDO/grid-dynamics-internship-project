import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm';
import { ProductModel } from '../productModel/productModel.entity';

@Entity()
export class Product implements Product {
  @ObjectIdColumn()
  id: string;

  @Column({length: 500})
  name: string;

  @Column('text')
  size: string;

  @Column('text')
  color: string;

  @Column()
  price: number;

  @ManyToOne(type => ProductModel, productModel => productModel.products)
  productModel: ProductModel;
}
