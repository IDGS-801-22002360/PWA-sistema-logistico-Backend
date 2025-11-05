import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from './paises.entity';
import { CreatePaisDto } from './create-paises.dto';
import { UpdatePaisDto } from './update-paises.dto';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private paisRepository: Repository<Pais>,
  ) {}

  findAll() {
    return this.paisRepository.find();
  }

  async findOne(id: number) {
    const pais = await this.paisRepository.findOneBy({ id });

    return pais;
  }

  create(dto: CreatePaisDto) {
    const pais = this.paisRepository.create(dto);
    return this.paisRepository.save(pais);
  }

  async update(id: number, dto: UpdatePaisDto) {
    const result = await this.paisRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró el País con ID ${id} para actualizar.`);
    }

    const updatedPais = await this.findOne(id);
    if (!updatedPais) {
      throw new NotFoundException(`País actualizado con ID ${id} no encontrado.`);
    }
    return updatedPais;
  }

  async remove(id: number) {
    const result = await this.paisRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró el País con ID ${id} para eliminar.`);
    }

    return {
      message: `País con ID ${id} eliminado exitosamente.`,
      deletedCount: result.affected,
    };
  }
}
