import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductSchema } from '../product/product.schema';
import { FavouriteService } from './service/favourite/favourite.service';
import { FavouriteController } from './controller/favourite/favourite.controller';
import { favouriteSchemaName, FavouriteSchema } from './models/favourite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: favouriteSchemaName, schema: FavouriteSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema }
    ]),
  ],
  providers: [FavouriteService],
  exports: [FavouriteService],
  controllers: [FavouriteController]
})
export class FavouriteModule {}
