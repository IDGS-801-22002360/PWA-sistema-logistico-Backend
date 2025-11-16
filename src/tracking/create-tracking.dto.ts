import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateTrackingDto {
  @IsNumber()
  id_operacion: number;

  @IsDateString()
  @IsOptional()
  fecha_hora_actualizacion?: string;

  @IsString()
  @IsOptional()
  ubicacion_actual?: string;

  @IsEnum(['en_origen', 'en_transito', 'en_destino', 'entregado', 'aduana'])
  estatus_seguimiento: string;

  @IsString()
  @IsOptional()
  referencia_transportista?: string;

  @IsString()
  @IsOptional()
  nombre_transportista?: string;

  @IsString()
  @IsOptional()
  notas_tracking?: string;
}
