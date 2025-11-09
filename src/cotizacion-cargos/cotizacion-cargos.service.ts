import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CotizacionCargo } from './cotizacion-cargos.entity';
import { CreateCotizacionCargoDto } from './create-cotizacion-cargo.dto';
import { UpdateCotizacionCargoDto } from './update-cotizacion-cargo.dto';

@Injectable()
export class CotizacionCargosService {
  constructor(
    @InjectRepository(CotizacionCargo)
    private readonly repo: Repository<CotizacionCargo>,
  ) {}

  // Encontrar todos los cargos
  findAll() {
    return this.repo.find({
      relations: ['cotizacion', 'tarifa'],
    });
  }

  // Encontrar cargos por cotización
  findByIdCotizacion(id_cotizacion: number) {
    return this.repo.find({
      where: { id_cotizacion },
      relations: ['cotizacion', 'tarifa'],
    });
  }

  // Encontrar un cargo específico
  async findOne(id: number) {
    const cargo = await this.repo.findOne({
      where: { id_cargo_cotizacion: id },
      relations: ['cotizacion', 'tarifa'],
    });
    if (!cargo) {
      throw new NotFoundException(`Cargo con ID ${id} no encontrado`);
    }
    return cargo;
  }

  // Crear un nuevo cargo
  create(createCotizacionCargoDto: CreateCotizacionCargoDto) {
    const cargo = this.repo.create(createCotizacionCargoDto as any);
    return this.repo.save(cargo);
  }

  // Actualizar un cargo existente
  async update(id: number, updateCotizacionCargoDto: UpdateCotizacionCargoDto) {
    const result = await this.repo.update(id, updateCotizacionCargoDto as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Cargo con ID ${id} no encontrado`);
    }
    return this.findOne(id);
  }

  // Eliminar un cargo
  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cargo con ID ${id} no encontrado`);
    }
    return { message: `Cargo con ID ${id} eliminado` };
  }

  // Calcular total de cargos por cotización
  async calcularTotalCargos(id_cotizacion: number) {
    const cargos = await this.findByIdCotizacion(id_cotizacion);
    const total = cargos.reduce((sum, cargo) => sum + Number(cargo.monto), 0);
    return {
      id_cotizacion,
      total_cargos: total,
      moneda: cargos.length > 0 ? cargos[0].moneda : null,
      numero_cargos: cargos.length,
    };
  }
}
