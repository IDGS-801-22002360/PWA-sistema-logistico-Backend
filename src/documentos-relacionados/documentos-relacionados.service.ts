import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentoRelacionado } from './documentos-relacionados.entity';
import { CreateDocumentoRelacionadoDto } from './create-documento.dto';
import { UpdateDocumentoRelacionadoDto } from './update-documento.dto';

@Injectable()
export class DocumentosRelacionadosService {
  constructor(
    @InjectRepository(DocumentoRelacionado)
    private readonly repo: Repository<DocumentoRelacionado>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['cotizacion', 'operacion', 'usuario_carga'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_documento: id }, relations: ['cotizacion', 'operacion', 'usuario_carga'] });
  }

  create(data: CreateDocumentoRelacionadoDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: number, data: UpdateDocumentoRelacionadoDto) {
    const res = await this.repo.update(id, data as any);
    if (res.affected === 0) throw new NotFoundException(`Documento ${id} no encontrado`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException(`Documento ${id} no encontrado`);
    return { message: `Documento ${id} eliminado` };
  }
}
