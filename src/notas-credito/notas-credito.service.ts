import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotaCredito } from './notas-credito.entity';
import { CreateNotaCreditoDto } from './create-nota-credito.dto';
import { UpdateNotaCreditoDto } from './update-nota-credito.dto';

@Injectable()
export class NotasCreditoService {
  constructor(
    @InjectRepository(NotaCredito)
    private readonly repo: Repository<NotaCredito>,
  ) { }

  findAll() {
    return this.repo.find({ relations: ['factura_cliente'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id_nota_credito: id },
      relations: ['factura_cliente'],
    });
  }

  create(data: CreateNotaCreditoDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateNotaCreditoDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0)
      throw new NotFoundException(`Nota credito ${id} no encontrada`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Nota credito ${id} no encontrada`);
    return { message: `Nota credito ${id} eliminada` };
  }
}
