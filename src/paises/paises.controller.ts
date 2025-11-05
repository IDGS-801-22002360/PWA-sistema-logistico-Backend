// src/paises/paises.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaisDto } from './create-paises.dto';
import { UpdatePaisDto } from './update-paises.dto';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pais = await this.paisesService.findOne(id);
    if (!pais) {
      throw new NotFoundException(`País con ID ${id} no encontrado.`);
    }
    return pais;
  }

  @Post()
  create(@Body() dto: CreatePaisDto) {
    return this.paisesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaisDto) {
    return this.paisesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paisesService.remove(id);
  }
}
