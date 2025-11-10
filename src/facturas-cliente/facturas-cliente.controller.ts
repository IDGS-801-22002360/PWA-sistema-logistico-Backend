import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturasClienteService } from './facturas-cliente.service';
import { CreateFacturaClienteDto } from './create-factura-cliente.dto';
import { UpdateFacturaClienteDto } from './update-factura-cliente.dto';

@Controller('facturas-cliente')
export class FacturasClienteController {
  constructor(private readonly facturasService: FacturasClienteService) { }

  @Post()
  create(@Body() dto: CreateFacturaClienteDto) {
    return this.facturasService.create(dto);
  }

  @Get()
  findAll() {
    return this.facturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacturaClienteDto) {
    return this.facturasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturasService.remove(+id);
  }
}
