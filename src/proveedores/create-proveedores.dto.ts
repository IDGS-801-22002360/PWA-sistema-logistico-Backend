import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsInt,
  Length,
  Min,
  IsEnum,
} from 'class-validator';
import { TipoServicio } from './proveedor.enum';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nombre_empresa: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  rfc: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  id_pais?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  id_localizacion?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email_contacto?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  contacto_nombre?: string;

  @IsEnum(TipoServicio, {
    message: `El servicio debe ser uno válido: ${Object.values(TipoServicio).join(', ')}`,
  })
  @IsNotEmpty()
  tipo_servicio_ofrecido: TipoServicio;
}
