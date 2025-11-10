import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentosRelacionadosService } from './documentos-relacionados.service';
import { CreateDocumentoRelacionadoDto } from './create-documento.dto';
import { UpdateDocumentoRelacionadoDto } from './update-documento.dto';

@Controller('documentos-relacionados')
export class DocumentosRelacionadosController {
  constructor(
    private readonly documentosService: DocumentosRelacionadosService,
  ) {}

  @Post()
  create(@Body() dto: CreateDocumentoRelacionadoDto) {
    return this.documentosService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentoRelacionadoDto) {
    return this.documentosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }
}
