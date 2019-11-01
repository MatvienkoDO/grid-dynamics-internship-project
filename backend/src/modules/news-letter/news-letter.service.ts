import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsLetter } from './news-letter.interface';
import { NewsLetterDto } from './dto/newsLetter.dto';

@Injectable()
export class NewsLetterService {
  constructor(@InjectModel('NewsLetter') private readonly newsLetterModel: Model<NewsLetter>) {}

  async create(createNewsLetterDto: NewsLetterDto): Promise<NewsLetter> {
    const creatednNewsLetter = new this.newsLetterModel(createNewsLetterDto);
    return await creatednNewsLetter.save();
  }

  async findAll(): Promise<NewsLetter[]> {
    return await this.newsLetterModel.find().exec();
  }

  async update(id: string, updateNewsLetterDto: NewsLetterDto): Promise<NewsLetter> {
    await this.newsLetterModel.findByIdAndUpdate(
      id,
      updateNewsLetterDto
    );
    return this.newsLetterModel.findById(id);
  }
}
