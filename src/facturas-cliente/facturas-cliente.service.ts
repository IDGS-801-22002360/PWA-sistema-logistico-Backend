import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaCliente } from './facturas-cliente.entity';
import { CreateFacturaClienteDto } from './create-factura-cliente.dto';
import { UpdateFacturaClienteDto } from './update-factura-cliente.dto';

@Injectable()
export class FacturasClienteService {
  constructor(
    @InjectRepository(FacturaCliente)
    private readonly repo: Repository<FacturaCliente>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['cliente', 'operacion', 'cotizacion'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_factura_cliente: id }, relations: ['cliente', 'operacion', 'cotizacion'] });
  }

  create(data: CreateFacturaClienteDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateFacturaClienteDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0) throw new NotFoundException(`Factura ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Factura ${id} no encontrada`);
    return { message: `Factura ${id} eliminada` };
  }
}
