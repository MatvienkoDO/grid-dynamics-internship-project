import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('test/clothes')
export class ClothesController {
  private clothes: Map<string, Object>;

  constructor() {
    this.clothes = new Map();
    this.clothes.set((+new Date).toString(16), {
      name: 'jacket'
    });
    this.clothes.set((+new Date + 1).toString(16), {
      name: 'shirt'
    });
    this.clothes.set((+new Date + 2).toString(16), {
      name: 'boots'
    });
  }

  @Get()
  findAll(): Object[] {
    const entities = [];
    this.clothes.forEach((value, key) => {
      entities.push({
        id: key,
        name: value['name']
      });
    });
    return entities;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const entity = this.clothes.get(id);
    return entity ? entity : '404 resourse not found';
  }

  @Post()
  create(@Body() body: Object) {
    const id = (+new Date).toString(16); // generate unique id
    this.clothes.set(id, body);
    return {
      id,
      name: this.clothes.get(id)['name']
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() newEntity: Object) {
    let entity = this.clothes.get(id);
    if (entity === undefined) {
      return '404 resourse not found';
    }
    for (const key in newEntity) {
      if (newEntity.hasOwnProperty(key)) {
        entity[key] = newEntity[key];
      }
    }
    return {
      id,
      name: entity['name']
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.clothes.has(id)) {
      return '404 resourse not found';
    }
    this.clothes.delete(id);
    return `This action removes a #${id} cat`;
  }
}
