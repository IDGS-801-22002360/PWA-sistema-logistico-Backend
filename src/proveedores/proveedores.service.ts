import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedores.entity';
import { CreateProveedorDto } from './create-proveedores.dto';
import { UpdateProveedorDto } from './update-proveedores.dto';

@Injectable()
export class ProveedorService {
  private readonly relations = ['pais', 'localizacion'];

  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
  ) {}

  findAll() {
    return this.proveedorRepository.find({
      relations: this.relations,
      order: { id_proveedor: 'ASC' },
    });
  }

  async findOne(id: number) {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: id },
      relations: this.relations,
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado.`);
    }
    return proveedor;
  }

  create(dto: CreateProveedorDto) {
    const proveedor = this.proveedorRepository.create(dto);
    return this.proveedorRepository.save(proveedor);
  }

  async update(id: number, dto: UpdateProveedorDto) {
    const result = await this.proveedorRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Proveedor con ID ${id} para actualizar.`,
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.proveedorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Proveedor con ID ${id} para eliminar.`,
      );
    }

    return {
      message: `Proveedor con ID ${id} eliminado exitosamente.`,
      deletedCount: result.affected,
    };
  }
}
