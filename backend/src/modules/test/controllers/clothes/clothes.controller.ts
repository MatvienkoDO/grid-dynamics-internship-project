import { Controller, Post, Get } from '@nestjs/common';
import { ClothesService } from './../../services/clothes/clothes.service'
import { Clothes } from './../../entities/clothes.interface'

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post('create')
  public create() {
    return 'create qwerty';
  }

  @Get()
  async findAll(): Promise<Clothes[]> {
    return [];
    //return this.clothesService.findAll();
  }

  // todo: continue making
}
