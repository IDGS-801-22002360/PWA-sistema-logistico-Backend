import { IsInt, IsOptional, IsString, IsUrl, IsEnum } from 'class-validator';

export class CreateDocumentoRelacionadoDto {
  @IsOptional()
  @IsInt()
  id_cotizacion?: number;

  @IsOptional()
  @IsInt()
  id_operacion?: number;

  @IsString()
  nombre_documento: string;

  @IsEnum(['BL', 'AWB', 'carta_porte', 'packing_list', 'factura_comercial', 'certificado_origen', 'pedimento', 'otro'] as any)
  tipo_documento: string;

  @IsUrl()
  url_archivo: string;

  @IsInt()
  id_usuario_carga: number;
}
