import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demora } from './demoras.entity';
import { CreateDemoraDto } from './create-demora.dto';
import { UpdateDemoraDto } from './update-demora.dto';
import { Operacion } from '../operaciones/operaciones.entity';

@Injectable()
export class DemorasService {
  constructor(
    @InjectRepository(Demora)
    private demoraRepository: Repository<Demora>,
    @InjectRepository(Operacion)
    private operacionRepository: Repository<Operacion>,
  ) {}

  async create(createDemoraDto: CreateDemoraDto): Promise<Demora> {
    const { id_operacion } = createDemoraDto as any;
    if (!id_operacion) {
      throw new BadRequestException('id_operacion is required');
    }

    const operacion = await this.operacionRepository.findOne({ where: { id_operacion } });
    if (!operacion) {
      throw new NotFoundException(`Operacion with id_operacion=${id_operacion} not found`);
    }

    const demora = this.demoraRepository.create(createDemoraDto);
    demora.operacion = operacion;
    return await this.demoraRepository.save(demora);
  }

  async findAll(): Promise<Demora[]> {
    return await this.demoraRepository.find({
      relations: ['operacion'],
    });
  }

  async findOne(id: number): Promise<Demora> {
    const demora = await this.demoraRepository.findOne({
      where: { id_demora: id },
      relations: ['operacion'],
    });
    if (!demora) {
      throw new NotFoundException(`Demora with ID ${id} not found`);
    }
    return demora;
  }

  async update(id: number, updateDemoraDto: UpdateDemoraDto): Promise<Demora> {
    const demora = await this.findOne(id);
    this.demoraRepository.merge(demora, updateDemoraDto);
    return await this.demoraRepository.save(demora);
  }

  async remove(id: number): Promise<void> {
    const result = await this.demoraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Demora with ID ${id} not found`);
    }
  }
}
