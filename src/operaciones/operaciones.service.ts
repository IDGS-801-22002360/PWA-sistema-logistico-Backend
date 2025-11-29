import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operacion } from './operaciones.entity';
import { CreateOperacionDto } from './create-operacion.dto';
import { UpdateOperacionDto } from './update-operacion.dto';

@Injectable()
export class OperacionesService {
  constructor(
    @InjectRepository(Operacion)
    private repo: Repository<Operacion>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['cliente', 'usuario_operativo', 'proveedor', 'agente'],
      order: { id_operacion: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id_operacion: id },
      relations: ['cliente', 'usuario_operativo', 'proveedor', 'agente'],
    });
  }

  async create(data: CreateOperacionDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateOperacionDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0) throw new NotFoundException(`Operacion ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Operacion ${id} no encontrada`);
    return { message: `Operacion ${id} eliminada` };
  }
}
