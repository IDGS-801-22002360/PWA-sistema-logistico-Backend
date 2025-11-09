import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarifa } from './tarifas.entity';
import { CreateTarifaDto } from './create-tarifa.dto';
import { UpdateTarifaDto } from './update-tarifa.dto';

@Injectable()
export class TarifasService {
  constructor(
    @InjectRepository(Tarifa)
    private repo: Repository<Tarifa>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id_tarifa: id });
  }

  async create(data: CreateTarifaDto) {
    const entity = this.repo.create(data as any);
    return this.repo.save(entity);
  }

  async update(id: number, data: UpdateTarifaDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0) throw new NotFoundException(`Tarifa ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Tarifa ${id} no encontrada`);
    return { message: `Tarifa ${id} eliminada` };
  }
}
