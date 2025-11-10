import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DemorasService } from './demoras.service';
import { CreateDemoraDto } from './create-demora.dto';
import { UpdateDemoraDto } from './update-demora.dto';

@Controller('demoras')
export class DemorasController {
  constructor(private readonly demorasService: DemorasService) {}

  @Post()
  create(@Body() createDemoraDto: CreateDemoraDto) {
    return this.demorasService.create(createDemoraDto);
  }

  @Get()
  findAll() {
    return this.demorasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demorasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoraDto: UpdateDemoraDto) {
    return this.demorasService.update(+id, updateDemoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demorasService.remove(+id);
  }
}
