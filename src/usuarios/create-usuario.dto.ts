import { RolUsuario } from './usuario.enum';
import { IsString, IsEmail, IsEnum, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(RolUsuario)
  @IsNotEmpty()
  rol: RolUsuario;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
