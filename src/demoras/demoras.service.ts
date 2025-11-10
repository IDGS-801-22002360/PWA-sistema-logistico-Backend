import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demora } from './demoras.entity';
import { CreateDemoraDto } from './create-demora.dto';
import { UpdateDemoraDto } from './update-demora.dto';

@Injectable()
export class DemorasService {
  constructor(
    @InjectRepository(Demora)
    private demoraRepository: Repository<Demora>,
  ) {}

  async create(createDemoraDto: CreateDemoraDto): Promise<Demora> {
    const demora = this.demoraRepository.create(createDemoraDto);
    return await this.demoraRepository.save(demora);
  }

  async findAll(): Promise<Demora[]> {
    return await this.demoraRepository.find({
      relations: ['operacion'],
    });
  }

  async findOne(id: number): Promise<Demora> {
    const demora = await this.demoraRepository.findOne({
      where: { id },
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
