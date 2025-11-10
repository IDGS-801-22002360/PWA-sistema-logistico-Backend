import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturaClienteDto } from './create-factura-cliente.dto';

export class UpdateFacturaClienteDto extends PartialType(CreateFacturaClienteDto) { }
