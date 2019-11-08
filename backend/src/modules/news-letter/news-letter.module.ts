import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsLetterController } from './news-letter.controller';
import { NewsLetterSchema } from './news-letter.schema';
import { NewsLetterService } from './news-letter.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'NewsLetter', schema: NewsLetterSchema }
  ])],
  controllers: [NewsLetterController],
  providers: [NewsLetterService],
})
export class NewsLetterModule {}
