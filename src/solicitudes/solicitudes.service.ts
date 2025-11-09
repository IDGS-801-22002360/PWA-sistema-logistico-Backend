import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudCotizacionCliente } from './solicitudes.entity';
import { CreateSolicitudDto } from './create-solicitud.dto';
import { UpdateSolicitudDto } from './update-solicitud.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(SolicitudCotizacionCliente)
    private repo: Repository<SolicitudCotizacionCliente>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id_solicitud: id });
  }

  async create(data: CreateSolicitudDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateSolicitudDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0) throw new NotFoundException(`Solicitud ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Solicitud ${id} no encontrada`);
    return { message: `Solicitud ${id} eliminada` };
  }
}
