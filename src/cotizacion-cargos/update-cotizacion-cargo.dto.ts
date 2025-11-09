import { PartialType } from '@nestjs/mapped-types';
import { CreateCotizacionCargoDto } from './create-cotizacion-cargo.dto';

export class UpdateCotizacionCargoDto extends PartialType(
  CreateCotizacionCargoDto,
) {}
