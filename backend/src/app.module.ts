import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClothesController } from './clothes/clothes.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ClothesController],
  providers: [AppService],
})
export class AppModule {}
