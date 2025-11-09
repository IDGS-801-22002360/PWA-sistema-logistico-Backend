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
import { LocalizacionService } from './localizacion.service';
import { CreateLocalizacionDto } from './create-localizacion.dto';
import { UpdateLocalizacionDto } from './update-localizacion.dto';

@Controller('localizaciones')
export class LocalizacionController {
  constructor(private readonly localizacionService: LocalizacionService) {}

  @Get()
  findAll() {
    return this.localizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.localizacionService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLocalizacionDto) {
    return this.localizacionService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocalizacionDto,
  ) {
    return this.localizacionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.localizacionService.remove(id);
  }
}
