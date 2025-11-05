import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AgenteService } from './agentes.service';
import { CreateAgenteDto } from './create-agentes.dto';
import { UpdateAgenteDto } from './update-agentes.dto';

@Controller('agentes')
export class AgenteController {
  constructor(private readonly agenteService: AgenteService) {}

  @Get()
  findAll() {
    return this.agenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agenteService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAgenteDto) {
    return this.agenteService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAgenteDto) {
    return this.agenteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agenteService.remove(id);
  }
}
