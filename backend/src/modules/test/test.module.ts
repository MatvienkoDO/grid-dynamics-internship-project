import { Module } from '@nestjs/common';
import { ClothesController } from './controllers/clothes/clothes.controller';
import { ClothesService } from './services/clothes/clothes.service';

@Module({
  controllers: [ClothesController],
  providers: [ClothesService]
})
export class TestModule {}
