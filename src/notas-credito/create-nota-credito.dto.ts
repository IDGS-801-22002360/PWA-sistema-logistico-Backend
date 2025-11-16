import { IsInt, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateNotaCreditoDto {
  @IsInt()
  id_factura_cliente: number;

  @IsString()
  @IsNotEmpty()
  numero_nota_credito: string;

  @IsNumber()
  monto: number;

  @IsString()
  moneda: string;

  @IsString()
  @IsOptional()
  motivo?: string;
}
