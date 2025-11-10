import { IsInt, IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateFacturaClienteDto {
  @IsInt()
  id_cliente: number;

  @IsOptional()
  @IsInt()
  id_operacion?: number;

  @IsOptional()
  @IsInt()
  id_cotizacion?: number;

  @IsString()
  @IsNotEmpty()
  numero_factura: string;

  @IsDateString()
  fecha_vencimiento: string;

  @IsNumber()
  monto_total: number;

  @IsOptional()
  @IsNumber()
  monto_pagado?: number;

  @IsString()
  moneda: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsDateString()
  fecha_pago?: string;
}
