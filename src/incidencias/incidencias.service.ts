import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from './incidencias.entity';
import { CreateIncidenciaDto } from './create-incidencia.dto';
import { UpdateIncidenciaDto } from './update-incidencia.dto';

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(createIncidenciaDto: CreateIncidenciaDto): Promise<Incidencia> {
    const incidencia = this.incidenciaRepository.create(createIncidenciaDto);
    return await this.incidenciaRepository.save(incidencia);
  }

  async findAll(): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      relations: ['operacion'],
    });
  }

  async findOne(id: number): Promise<Incidencia> {
    const incidencia = await this.incidenciaRepository.findOne({
      where: { id },
      relations: ['operacion'],
    });
    if (!incidencia) {
      throw new NotFoundException(`Incidencia with ID ${id} not found`);
    }
    return incidencia;
  }

  async update(
    id: number,
    updateIncidenciaDto: UpdateIncidenciaDto,
  ): Promise<Incidencia> {
    const incidencia = await this.findOne(id);
    this.incidenciaRepository.merge(incidencia, updateIncidenciaDto);
    return await this.incidenciaRepository.save(incidencia);
  }

  async remove(id: number): Promise<void> {
    const result = await this.incidenciaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Incidencia with ID ${id} not found`);
    }
  }
}
