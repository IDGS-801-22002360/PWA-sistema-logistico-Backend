import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localizacion } from './localizacion.entity';
import { LocalizacionService } from './localizacion.service';
import { LocalizacionController } from './localizacion.controller';
import { Pais } from '../paises/paises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localizacion, Pais])],
  controllers: [LocalizacionController],
  providers: [LocalizacionService],
  exports: [LocalizacionService],
})
export class LocalizacionModule {}
