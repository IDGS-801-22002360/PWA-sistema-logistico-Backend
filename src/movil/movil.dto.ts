import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class RegisterClienteRequestDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nombre_empresa: string;

  @IsString()
  rfc: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}

export class CrearSolicitudRequestDto {
  @IsString()
  tipo_servicio: string;

  @IsString()
  tipo_carga: string;

  @IsString()
  origen_ciudad: string;

  @IsString()
  origen_pais: string;

  @IsString()
  destino_ciudad: string;

  @IsString()
  destino_pais: string;

  @IsOptional()
  @IsString()
  descripcion_mercancia?: string;

  @IsOptional()
  @IsNumber()
  valor_estimado_mercancia?: number;
}

export class EditarClienteRequestDto {
  @IsOptional()
  @IsString()
  nombre_empresa?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email_contacto?: string;

  @IsOptional()
  @IsString()
  contacto_nombre?: string;

  @IsOptional()
  @IsString()
  contacto_puesto?: string;

  @IsOptional()
  @IsString()
  nombre_usuario?: string;

  @IsOptional()
  @IsString()
  apellido_usuario?: string;

  @IsOptional()
  @IsString()
  email_usuario?: string;
}

export interface FacturaClienteResponseDto {
  id_factura_cliente: string;
  id_cliente: string;
  id_operacion?: string | null;
  id_cotizacion?: string | null;
  numero_factura: string;
  fecha_emision: Date;
  fecha_vencimiento: Date;
  monto_total: number;
  monto_pagado: number;
  moneda: string;
  estatus: string;
  observaciones?: string | null;
  fecha_creacion: Date;
  cotizacion_tipo_servicio?: string | null;
  cotizacion_tipo_carga?: string | null;
  cotizacion_incoterm?: string | null;
  descripcion_mercancia?: string | null;
  operacion_tipo_servicio?: string | null;
  fecha_inicio_operacion?: Date | null;
  fecha_estimada_entrega?: Date | null;
}
