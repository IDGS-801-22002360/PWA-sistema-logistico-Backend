import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotizacionCargosService } from './cotizacion-cargos.service';
import { CotizacionCargosController } from './cotizacion-cargos.controller';
import { CotizacionCargo } from './cotizacion-cargos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CotizacionCargo])],
    controllers: [CotizacionCargosController],
    providers: [CotizacionCargosService],
    exports: [CotizacionCargosService],
})
export class CotizacionCargosModule { }