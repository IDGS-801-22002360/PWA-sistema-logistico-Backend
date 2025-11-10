import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './create-tracking.dto';
import { UpdateTrackingDto } from './update-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  findAll() {
    return this.trackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(+id);
  }

  @Get('operacion/:id')
  findByOperacion(@Param('id') id: string) {
    return this.trackingService.findByOperacion(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
