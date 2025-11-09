import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes.entity';
import { ClienteService } from './clientes.service';
import { ClienteController } from './clientes.controller';
import { Pais } from '../paises/paises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Pais /*, Localizacion*/])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClientesModule {}
