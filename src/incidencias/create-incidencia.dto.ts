import { IsNumber, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateIncidenciaDto {
  @IsNumber()
  id_operacion: number;

  @IsDateString()
  fecha_hora_incidencia: string;

  @IsString()
  descripcion_incidencia: string;

  @IsEnum(['daño_mercancia', 'extravio_parcial', 'extravio_total', 'robo', 'error_documentacion', 'otro'])
  tipo_incidencia: string;

  @IsEnum(['reportada', 'en_revision', 'resuelta', 'escalada'])
  @IsOptional()
  estatus?: string;

  @IsDateString()
  @IsOptional()
  fecha_resolucion?: string;

  @IsString()
  @IsOptional()
  comentarios_resolucion?: string;
}
