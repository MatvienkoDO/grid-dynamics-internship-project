import { Controller, Post } from '@nestjs/common';

@Controller('clothes')
export class ClothesController {

  @Post('create')
  public create() {
    return 'create qwerty';
  }

  // todo: continue making
}
