import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemorasService } from './demoras.service';
import { DemorasController } from './demoras.controller';
import { Demora } from './demoras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demora])],
  controllers: [DemorasController],
  providers: [DemorasService],
  exports: [DemorasService],
})
export class DemorasModule {}
