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
    // Remove password before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = usuario as any;
    return safe;
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
    // If password is being updated, hash it
    const payload: any = { ...data } as any;
    if (payload.password) {
      const hashed = await bcrypt.hash(payload.password, 10);
      payload.password = hashed;
    }

    const resultado = await this.usuarioRepo.update({ id_usuario: id }, payload as any);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const resultado = await this.usuarioRepo.delete({ id_usuario: id });
    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: `Usuario con ID ${id} eliminado` };
  }
}
