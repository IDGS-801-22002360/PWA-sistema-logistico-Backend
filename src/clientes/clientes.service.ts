import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './clientes.entity';
import { CreateClienteDto } from './create-clientes.dto';
import { UpdateClienteDto } from './update-clientes.dto';

@Injectable()
export class ClienteService {
  private readonly relations = ['pais' /*, 'localizacion'*/];

  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.clienteRepository.find({ relations: this.relations });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id_cliente: id },
      relations: this.relations,
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }
    return cliente;
  }

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  async update(id: number, dto: UpdateClienteDto) {
    const result = await this.clienteRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Cliente con ID ${id} para actualizar.`,
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.clienteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró el Cliente con ID ${id} para eliminar.`,
      );
    }

    return {
      message: `Cliente con ID ${id} eliminado exitosamente.`,
      deletedCount: result.affected,
    };
  }
}
