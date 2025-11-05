import { PartialType } from '@nestjs/mapped-types';
import { CreatePaisDto } from './create-paises.dto';

export class UpdatePaisDto extends PartialType(CreatePaisDto) {}
