import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { ProductModule } from './modules/product/product.module';
import { ProductModelModule } from './modules/productModel/productModel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductModule,
    ProductModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
