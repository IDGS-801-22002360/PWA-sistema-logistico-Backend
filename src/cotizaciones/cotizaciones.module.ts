import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacion } from './cotizaciones.entity';
import { CotizacionesService } from './cotizaciones.service';
import { CotizacionesController } from './cotizaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cotizacion])],
  providers: [CotizacionesService],
  controllers: [CotizacionesController],
  exports: [CotizacionesService],
})
export class CotizacionesModule {}
