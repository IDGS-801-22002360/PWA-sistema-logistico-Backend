import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agente } from './agentes.entity';
import { CreateAgenteDto } from './create-agentes.dto';
import { UpdateAgenteDto } from './update-agentes.dto';

@Injectable()
export class AgenteService {
  constructor(
    @InjectRepository(Agente)
    private agenteRepository: Repository<Agente>,
  ) {}

  findAll() {
    return this.agenteRepository.find({
      order: { id_agente: 'ASC' },
    });
  }

  async findOne(id: number) {
    const agente = await this.agenteRepository.findOneBy({ id_agente: id });
    if (!agente) {
      throw new NotFoundException(`Agente con ID ${id} no encontrado.`);
    }
    return agente;
  }

  create(dto: CreateAgenteDto) {
    const agente = this.agenteRepository.create(dto);
    return this.agenteRepository.save(agente);
  }

  async update(id: number, dto: UpdateAgenteDto) {
    const result = await this.agenteRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Agente con ID ${id} para actualizar.`,
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.agenteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Agente con ID ${id} para eliminar.`,
      );
    }

    return {
      message: `Agente con ID ${id} eliminado exitosamente.`,
      deletedCount: result.affected,
    };
  }
}
