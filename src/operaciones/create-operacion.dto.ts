import { IsInt, IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { TipoServicio, TipoCarga, Incoterm } from '../common/enums/transport.enums';

export class CreateOperacionDto {
  @IsOptional()
  @IsInt()
  id_cotizacion?: number;

  @IsInt()
  id_cliente: number;

  @IsInt()
  id_usuario_operativo: number;

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
  numero_referencia_proveedor?: string;

  @IsOptional()
  @IsString()
  notas_operacion?: string;

  @IsOptional()
  @IsEnum(['pendiente_documentos', 'en_transito', 'en_aduana', 'entregado', 'cancelado'])
  estatus?: string;
}
