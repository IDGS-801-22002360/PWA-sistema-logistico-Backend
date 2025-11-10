import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDemoraDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  tiempo_demora: number;

  @IsString()
  motivo: string;

  @IsString()
  impacto: string;

  @IsString()
  acciones_tomadas: string;

  @IsNumber()
  operacionId: number;
}
