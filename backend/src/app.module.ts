import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { ClothesController } from './clothes/clothes.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { ProductModule } from './modules/product/product.module';
import { databaseUri } from './database'

@Module({
  imports: [
    MongooseModule.forRoot(databaseUri),
    AppRoutingModule,
    TestModule,
    ProductModule
  ],
  controllers: [AppController, ClothesController],
  providers: [AppService],
})
export class AppModule {}
