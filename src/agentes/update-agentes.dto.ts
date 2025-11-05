import { CreateAgenteDto } from './create-agentes.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAgenteDto extends PartialType(CreateAgenteDto) {}
