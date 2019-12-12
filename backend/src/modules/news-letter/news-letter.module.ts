import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsLetterController } from './news-letter.controller';
import { NewsLetterSchema } from './news-letter.schema';
import { NewsLetterService } from './news-letter.service';

const mongooseConfig = [
  { name: 'NewsLetter', schema: NewsLetterSchema },
];

@Module({
  imports: [
    MongooseModule.forFeature(mongooseConfig),
  ],
  controllers: [NewsLetterController],
  providers: [NewsLetterService],
})
export class NewsLetterModule { }
