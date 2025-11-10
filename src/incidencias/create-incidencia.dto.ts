import { IsString, IsOptional } from 'class-validator';

export class CreateIncidenciaDto {
  @IsString()
  tipo_incidencia: string;

  @IsString()
  descripcion: string;

  @IsString()
  gravedad: string;

  @IsString()
  estado: string;

  @IsString()
  @IsOptional()
  resolucion?: string;

  @IsString()
  operacionId: string;
}
