import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovilController } from './movil.controller';
import { MovilService } from './movil.service';
import { Usuario } from '../usuarios/usuario.entity';
import { Cliente } from '../clientes/clientes.entity';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';
import { Operacion } from '../operaciones/operaciones.entity';
import { SolicitudCotizacionCliente } from '../solicitudes/solicitudes.entity';
import { FacturaCliente } from '../facturas-cliente/facturas-cliente.entity';
import { Tracking } from '../tracking/tracking.entity';
import { Pais } from '../paises/paises.entity';
import { Localizacion } from '../localizacion/localizacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Cliente,
      Cotizacion,
      Operacion,
      SolicitudCotizacionCliente,
      FacturaCliente,
      Tracking,
      Pais,
      Localizacion,
    ]),
  ],
  controllers: [MovilController],
  providers: [MovilService],
  exports: [MovilService],
})
export class MovilModule {}
