import { Test, TestingModule } from '@nestjs/testing';
import { ClothesService } from './clothes.service';

describe('ClothesService', () => {
  let service: ClothesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothesService],
    }).compile();

    service = module.get<ClothesService>(ClothesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
