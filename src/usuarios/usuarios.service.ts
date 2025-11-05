import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';
import { UpdateUsuarioDto } from './update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOneBy({ id });
  }

  create(data: CreateUsuarioDto) {
    const nuevo = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(nuevo);
  }

  async update(id: number, data: UpdateUsuarioDto) {
    await this.usuarioRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.usuarioRepo.delete(id);
  }
}
