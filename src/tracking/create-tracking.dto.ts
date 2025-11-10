import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTrackingDto {
  @IsString()
  ubicacion: string;

  @IsString()
  estado: string;

  @IsString()
  @IsOptional()
  comentarios?: string;

  @IsDate()
  @Type(() => Date)
  fecha_evento: Date;

  @Type(() => Number)
  @IsNumber()
  operacionId: number;
}
