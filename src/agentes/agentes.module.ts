import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agente } from './agentes.entity';
import { AgenteService } from './agentes.service';
import { AgenteController } from './agentes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agente])],
  controllers: [AgenteController],
  providers: [AgenteService],
  exports: [AgenteService],
})
export class AgenteModule {}
