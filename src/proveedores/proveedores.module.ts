import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedores.entity';
import { ProveedorService } from './proveedores.service';
import { ProveedorController } from './proveedores.controller';
import { Pais } from '../paises/paises.entity';
import { Localizacion } from '../localizacion/localizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Pais, Localizacion])],
  controllers: [ProveedorController],
  providers: [ProveedorService],
  exports: [ProveedorService],
})
export class ProveedoresModule {}
