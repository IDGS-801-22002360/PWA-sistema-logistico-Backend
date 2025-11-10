import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracking } from './tracking.entity';
import { CreateTrackingDto } from './create-tracking.dto';
import { UpdateTrackingDto } from './update-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const tracking = this.trackingRepository.create({
      ...createTrackingDto,
      operacionId: Number(createTrackingDto.operacionId),
    });
    return await this.trackingRepository.save(tracking);
  }

  async findAll(): Promise<Tracking[]> {
    return await this.trackingRepository.find({
      relations: ['operacion'],
      order: { fecha_evento: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Tracking> {
    const tracking = await this.trackingRepository.findOne({
      where: { id },
      relations: ['operacion'],
    });
    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }
    return tracking;
  }

  async findByOperacion(operacionId: number): Promise<Tracking[]> {
    return await this.trackingRepository.find({
      where: { operacionId: operacionId },
      relations: ['operacion'],
      order: { fecha_evento: 'DESC' },
    });
  }

  async update(
    id: number,
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<Tracking> {
    const tracking = await this.findOne(id);
    if (updateTrackingDto.operacionId) {
      updateTrackingDto.operacionId = Number(updateTrackingDto.operacionId);
    }
    this.trackingRepository.merge(tracking, updateTrackingDto);
    return await this.trackingRepository.save(tracking);
  }

  async remove(id: number): Promise<void> {
    const result = await this.trackingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }
  }
}
