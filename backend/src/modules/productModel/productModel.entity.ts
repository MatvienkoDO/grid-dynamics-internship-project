import { Entity, Column, ObjectIdColumn, OneToMany, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ProductModel {
  @ObjectIdColumn()
  id: string;

  @Column({length: 500})
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  category: string;

  @Column('text')
  brand: number;

  @OneToMany(type => Product, product => product.productModel)
  @JoinColumn()
  products: Product[];
}
