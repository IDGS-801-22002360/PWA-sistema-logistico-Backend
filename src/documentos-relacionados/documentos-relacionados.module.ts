import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosRelacionadosService } from './documentos-relacionados.service';
import { DocumentosRelacionadosController } from './documentos-relacionados.controller';
import { DocumentoRelacionado } from './documentos-relacionados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoRelacionado])],
  controllers: [DocumentosRelacionadosController],
  providers: [DocumentosRelacionadosService],
  exports: [DocumentosRelacionadosService],
})
export class DocumentosRelacionadosModule {}
