import { Module } from '@nestjs/common';
import { ClothesController } from './controllers/clothes/clothes.controller';

@Module({
  controllers: [ClothesController]
})
export class TestModule {}
