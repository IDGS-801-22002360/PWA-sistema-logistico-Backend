import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturasClienteService } from './facturas-cliente.service';
import { FacturasClienteController } from './facturas-cliente.controller';
import { FacturaCliente } from './facturas-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacturaCliente])],
  controllers: [FacturasClienteController],
  providers: [FacturasClienteService],
  exports: [FacturasClienteService],
})
export class FacturasClienteModule { }
