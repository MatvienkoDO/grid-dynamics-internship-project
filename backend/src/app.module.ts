import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { databaseUri } from './database'
import { NewsLetterModule } from './modules/news-letter/news-letter.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseUri),
    ProductModule,
    NewsLetterModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
