import { IsInt, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCotizacionCargoDto {
  @IsInt()
  id_cotizacion: number;

  @IsOptional()
  @IsInt()
  id_tarifa?: number;

  @IsString()
  @IsNotEmpty()
  descripcion_cargo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  monto: number;

  @IsString()
  @IsNotEmpty()
  moneda: string;

  @IsOptional()
  @IsBoolean()
  aplica_proveedor?: boolean;

  @IsOptional()
  @IsBoolean()
  aplica_cliente?: boolean;
}
