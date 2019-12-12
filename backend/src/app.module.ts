import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { databaseUri } from './database';
import { NewsLetterModule } from './modules/news-letter/news-letter.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { CartModule } from './modules/cart/cart.module';
import { FavouriteModule } from './modules/favourite/favourite.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseUri),
    ProductModule,
    NewsLetterModule,
    AuthenticationModule,
    UsersModule,
    CartModule,
    FavouriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
