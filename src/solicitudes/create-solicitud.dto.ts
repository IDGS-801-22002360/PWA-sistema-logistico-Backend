import { IsInt, IsEnum, IsOptional, IsDateString, IsString, IsNumberString } from 'class-validator';
import { TipoServicio, TipoCarga } from '../common/enums/transport.enums';

export class CreateSolicitudDto {
  @IsInt()
  id_cliente: number;

  @IsEnum(TipoServicio)
  tipo_servicio: TipoServicio;

  @IsEnum(TipoCarga)
  tipo_carga: TipoCarga;

  @IsInt()
  id_origen_localizacion: number;

  @IsInt()
  id_destino_localizacion: number;

  @IsOptional()
  @IsDateString()
  fecha_solicitud?: string;

  @IsOptional()
  @IsString()
  descripcion_mercancia?: string;

  @IsOptional()
  @IsNumberString()
  valor_estimado_mercancia?: string;
}
