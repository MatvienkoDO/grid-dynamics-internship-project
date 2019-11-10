import { Test, TestingModule } from '@nestjs/testing';
import { NewsLetterController } from './news-letter.controller';

describe('NewsLetter Controller', () => {
  let controller: NewsLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsLetterController],
    }).compile();

    controller = module.get<NewsLetterController>(NewsLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
