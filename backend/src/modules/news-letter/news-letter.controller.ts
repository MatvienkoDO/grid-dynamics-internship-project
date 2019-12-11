import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { NewsLetterService } from './news-letter.service';
import { NewsLetterDto } from './dto/newsLetter.dto';
import { NewsLetter } from './news-letter.interface';
import * as constants from '../../shared/constants';

@Controller('api/news-letter')
export class NewsLetterController {
  constructor(private readonly newsLetterService: NewsLetterService) {}

  @Post()
  create(@Body() createNewsLetterDto: NewsLetterDto): Promise<NewsLetter> {
    return this.newsLetterService.create(createNewsLetterDto);
  }

  @Get()
  findAll(): Promise<NewsLetter[]> {
    return this.newsLetterService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNewsLetterDto: NewsLetterDto,
  ): Promise<NewsLetter> {

    const updateResult = await this.newsLetterService.update(id, updateNewsLetterDto);

    if (!updateResult) {
      throw new HttpException({
        status: constants.incorrectIdStatus,
      }, HttpStatus.BAD_REQUEST);
    }

    return updateResult;
  }
}
