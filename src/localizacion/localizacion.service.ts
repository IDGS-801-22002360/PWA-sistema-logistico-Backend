import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localizacion } from './localizacion.entity';
import { CreateLocalizacionDto } from './create-localizacion.dto';
import { UpdateLocalizacionDto } from './update-localizacion.dto';

@Injectable()
export class LocalizacionService {
  private readonly relations = ['pais'];

  constructor(
    @InjectRepository(Localizacion)
    private localizacionRepository: Repository<Localizacion>,
  ) {}

  findAll() {
    return this.localizacionRepository.find({ relations: this.relations });
  }

  async findOne(id: number) {
    const localizacion = await this.localizacionRepository.findOne({
      where: { id_localizacion: id },
      relations: this.relations,
    });

    if (!localizacion) {
      throw new NotFoundException(`Localización con ID ${id} no encontrada.`);
    }
    return localizacion;
  }

  create(dto: CreateLocalizacionDto) {
    const localizacion = this.localizacionRepository.create(dto);
    return this.localizacionRepository.save(localizacion);
  }

  async update(id: number, dto: UpdateLocalizacionDto) {
    const result = await this.localizacionRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró la Localización con ID ${id} para actualizar.`,
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.localizacionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró la Localización con ID ${id} para eliminar.`,
      );
    }

    return {
      message: `Localización con ID ${id} eliminada exitosamente.`,
      deletedCount: result.affected,
    };
  }
}
