import { IsInt, IsNotEmpty, IsEnum, IsString, IsDateString, IsNumberString } from 'class-validator';
import { TipoServicio, TipoCarga, Incoterm } from '../common/enums/transport.enums';

export class CreateTarifaDto {
  @IsInt()
  id_proveedor: number;

  @IsEnum(TipoServicio)
  tipo_servicio: TipoServicio;

  @IsEnum(TipoCarga)
  tipo_carga: TipoCarga;

  @IsInt()
  id_origen_localizacion: number;

  @IsInt()
  id_destino_localizacion: number;

  @IsEnum(Incoterm)
  incoterm: Incoterm;

  @IsNumberString()
  precio_base: string;

  @IsString()
  moneda: string;

  @IsDateString()
  fecha_vigencia_inicio: string;

  @IsDateString()
  fecha_vigencia_fin: string;
}
