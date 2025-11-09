// src/clientes/dto/create-cliente.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsInt,
  Length,
  Min,
} from 'class-validator';

export class CreateClienteDto {
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

  @IsOptional()
  @IsString()
  @Length(1, 100)
  contacto_puesto?: string;
}
