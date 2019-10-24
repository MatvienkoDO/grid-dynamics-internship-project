import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('clothes')
export class ClothesController {
  constructor() {}

  clothes: Object[] = [
    {
      id: 1, name: 'jacket'
    },
    {
      id: 2, name: 'shirt'
    },
    {
      id: 3, name: 'boots'
    }
  ];

  @Get()
  findAll(): Object[] {
    return this.clothes;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const entity = this.clothes.filter(el => el['id'] === +id);
    return entity.length ? entity : '404 resourse not found';
  }

  @Post()
  create(@Body() body: Object) {
    let id = this.clothes.push(body) - 1;
    return this.clothes;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() newEntity: Object) {
    let entity = this.clothes.filter(el => el['id'] === +id);
    if (entity.length === 0) {
      return '404 resourse not found';
    }
    for (const key in newEntity) {
      if (newEntity.hasOwnProperty(key)) {
        entity[0][key] = newEntity[key];
      }
    }
    return entity[0];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    let index = -1;
    for (let i = 0; i < this.clothes.length; i++) {
      if (this.clothes[i]['id'] === +id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return '404 resourse not found';
    }
    this.clothes.splice(index);
    return `This action removes a #${id} cat`;
  }
}
