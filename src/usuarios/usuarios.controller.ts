import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  getAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateUsuarioDto) {
    return this.usuarioService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateUsuarioDto) {
    return this.usuarioService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
