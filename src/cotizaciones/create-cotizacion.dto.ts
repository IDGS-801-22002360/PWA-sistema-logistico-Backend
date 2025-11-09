import { IsInt, IsEnum, IsOptional, IsDateString, IsString } from 'class-validator';
import { TipoServicio, TipoCarga, Incoterm } from '../common/enums/transport.enums';

export class CreateCotizacionDto {
  @IsInt()
  id_cliente: number;

  @IsInt()
  id_usuario_ventas: number;

  @IsOptional()
  @IsInt()
  id_usuario_operativo?: number;

  @IsInt()
  id_origen_localizacion: number;

  @IsInt()
  id_destino_localizacion: number;

  @IsInt()
  id_proveedor: number;

  @IsOptional()
  @IsInt()
  id_agente?: number;

  @IsEnum(TipoServicio)
  tipo_servicio: TipoServicio;

  @IsEnum(TipoCarga)
  tipo_carga: TipoCarga;

  @IsEnum(Incoterm)
  incoterm: Incoterm;

  @IsOptional()
  @IsDateString()
  fecha_estimada_arribo?: string;

  @IsOptional()
  @IsDateString()
  fecha_estimada_entrega?: string;

  @IsOptional()
  @IsString()
  descripcion_mercancia?: string;

  @IsOptional()
  @IsString()
  estatus?: string;

  @IsOptional()
  @IsInt()
  id_solicitud_cliente?: number;
}
