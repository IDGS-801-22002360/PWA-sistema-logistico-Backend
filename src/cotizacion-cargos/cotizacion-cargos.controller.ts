import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CotizacionCargosService } from './cotizacion-cargos.service';
import { CreateCotizacionCargoDto } from './create-cotizacion-cargo.dto';
import { UpdateCotizacionCargoDto } from './update-cotizacion-cargo.dto';

@Controller('cotizacion-cargos')
export class CotizacionCargosController {
  constructor(
    private readonly cotizacionCargosService: CotizacionCargosService,
  ) {}

  @Post()
  create(@Body() createCotizacionCargoDto: CreateCotizacionCargoDto) {
    return this.cotizacionCargosService.create(createCotizacionCargoDto);
  }

  @Get()
  findAll() {
    return this.cotizacionCargosService.findAll();
  }

  @Get('cotizacion/:id')
  findByIdCotizacion(@Param('id') id: string) {
    return this.cotizacionCargosService.findByIdCotizacion(+id);
  }

  @Get('cotizacion/:id/total')
  calcularTotalCargos(@Param('id') id: string) {
    return this.cotizacionCargosService.calcularTotalCargos(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotizacionCargosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCotizacionCargoDto: UpdateCotizacionCargoDto) {
    return this.cotizacionCargosService.update(+id, updateCotizacionCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotizacionCargosService.remove(+id);
  }
}