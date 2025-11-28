import { IsInt, IsEnum, IsOptional, IsDateString, IsString, IsNumberString } from 'class-validator';
import { TipoServicio, TipoCarga } from '../common/enums/transport.enums';

export class UpdateSolicitudDto {
  @IsOptional()
  @IsInt()
  id_cliente?: number;

  @IsOptional()
  @IsEnum(TipoServicio)
  tipo_servicio?: TipoServicio;

  @IsOptional()
  @IsEnum(TipoCarga)
  tipo_carga?: TipoCarga;

  @IsOptional()
  @IsInt()
  id_origen_localizacion?: number;

  @IsOptional()
  @IsInt()
  id_destino_localizacion?: number;

  @IsOptional()
  @IsDateString()
  fecha_solicitud?: string;

  @IsOptional()
  @IsString()
  descripcion_mercancia?: string;

  @IsOptional()
  @IsNumberString()
  valor_estimado_mercancia?: string;

  @IsOptional()
  @IsEnum(['nueva', 'en_proceso', 'cotizada', 'rechazada'])
  estatus?: string;
}
