import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { TipoAgente } from './agentes.enum';

export class CreateAgenteDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @Length(1, 100)
  nombre: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @Length(1, 100)
  apellido: string;

  @IsEmail({}, { message: 'El formato del email no es válido.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @Length(1, 50)
  telefono?: string;

  @IsEnum(TipoAgente, {
    message: `El tipo de agente debe ser uno válido: ${Object.values(TipoAgente).join(', ')}`,
  })
  @IsNotEmpty({ message: 'El tipo de agente es obligatorio.' })
  tipo_agente: TipoAgente;
}
