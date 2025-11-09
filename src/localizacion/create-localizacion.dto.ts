import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { TipoUbicacion } from './localizacion.enum';

export class CreateLocalizacionDto {
  @IsInt({ message: 'El id_pais debe ser un número entero.' })
  @Min(1, { message: 'El id_pais debe ser un número positivo.' })
  @IsNotEmpty()
  id_pais: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre_ciudad: string;

  @IsEnum(TipoUbicacion, {
    message: `El tipo de ubicación debe ser uno válido: ${Object.values(TipoUbicacion).join(', ')}`,
  })
  @IsNotEmpty()
  tipo_ubicacion: TipoUbicacion;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  codigo_iata_icao?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  direccion?: string;
}
