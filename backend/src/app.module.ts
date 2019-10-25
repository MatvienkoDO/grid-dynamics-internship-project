import { Module } from '@nestjs/common';

import { AppRoutingModule } from './app-routing.module';
import { AppController } from './app.controller';
import { ClothesController } from './clothes/clothes.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    AppRoutingModule,
    TestModule
  ],
  controllers: [AppController, ClothesController],
  providers: [AppService],
})
export class AppModule {}
