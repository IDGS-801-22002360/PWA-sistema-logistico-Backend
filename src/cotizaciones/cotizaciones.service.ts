import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cotizacion } from './cotizaciones.entity';
import { CreateCotizacionDto } from './create-cotizacion.dto';
import { UpdateCotizacionDto } from './update-cotizacion.dto';

@Injectable()
export class CotizacionesService {
  constructor(
    @InjectRepository(Cotizacion)
    private repo: Repository<Cotizacion>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['cliente', 'usuario_ventas', 'usuario_operativo', 'origen', 'destino', 'proveedor', 'agente', 'solicitud_cliente'],
      order: { id_cotizacion: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id_cotizacion: id },
      relations: ['cliente', 'usuario_ventas', 'usuario_operativo', 'origen', 'destino', 'proveedor', 'agente', 'solicitud_cliente'],
    });
  }

  async create(data: CreateCotizacionDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateCotizacionDto) {
    const res = await this.repo.update({ id_cotizacion: id }, data as any);
    if (res.affected === 0) throw new NotFoundException(`Cotizacion ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete({ id_cotizacion: id });
    if (res.affected === 0) throw new NotFoundException(`Cotizacion ${id} no encontrada`);
    return { message: `Cotizacion ${id} eliminada` };
  }
}
