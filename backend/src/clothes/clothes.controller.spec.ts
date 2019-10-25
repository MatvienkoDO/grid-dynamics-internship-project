import { Test, TestingModule } from '@nestjs/testing';
import { ClothesController } from './clothes.controller';

describe('Clothes Controller', () => {
  let controller: ClothesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothesController],
    }).compile();

    controller = module.get<ClothesController>(ClothesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
