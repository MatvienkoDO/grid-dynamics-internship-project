import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { cartSchemaName, CartSchema } from './models/cart.schema';
import { ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    // TODO: maybe it would be correct to be a single module, not 2 MongooseModule.forFeature
    MongooseModule.forFeature([
      { name: cartSchemaName, schema: CartSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController],
})
export class CartModule { }
