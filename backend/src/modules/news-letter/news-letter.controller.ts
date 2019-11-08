import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';

import { NewsLetterService } from './news-letter.service';
import { NewsLetterDto } from './dto/newsLetter.dto';
import { NewsLetter } from './news-letter.interface';

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
  update(
    @Param('id') id: string,
    @Body() updateNewsLetterDto: NewsLetterDto
    ): Promise<NewsLetter> {
    return this.newsLetterService.update(id, updateNewsLetterDto);
  }
}
