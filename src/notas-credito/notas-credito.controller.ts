import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasCreditoService } from './notas-credito.service';
import { CreateNotaCreditoDto } from './create-nota-credito.dto';
import { UpdateNotaCreditoDto } from './update-nota-credito.dto';

@Controller('notas-credito')
export class NotasCreditoController {
  constructor(private readonly notasService: NotasCreditoService) { }

  @Post()
  create(@Body() dto: CreateNotaCreditoDto) {
    return this.notasService.create(dto);
  }

  @Get()
  findAll() {
    return this.notasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNotaCreditoDto) {
    return this.notasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasService.remove(+id);
  }
}
