import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateDemoraDto {
  @IsNumber()
  id_operacion: number;

  @IsDateString()
  fecha_hora_demora: string;

  @IsString()
  @IsOptional()
  descripcion_demora?: string;

  @IsEnum(['climatica', 'aduana', 'mecanica', 'documental', 'trafico', 'otro'])
  tipo_demora: string;

  @IsNumber()
  @IsOptional()
  costo_asociado?: number;

  @IsString()
  @IsOptional()
  moneda?: string;
}
