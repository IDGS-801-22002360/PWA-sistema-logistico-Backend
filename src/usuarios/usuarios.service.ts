import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';
import { UpdateUsuarioDto } from './update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuarioRepo.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async create(data: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const nuevo = this.usuarioRepo.create({
      ...data,
      password: hashedPassword,
      activo: data.activo ?? true
    });
    const { password, ...result } = await this.usuarioRepo.save(nuevo);
    return result;
  }

  async update(id: number, data: UpdateUsuarioDto) {
    const resultado = await this.usuarioRepo.update(id, data);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const resultado = await this.usuarioRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: `Usuario con ID ${id} eliminado` };
  }
}
