import { PartialType } from '@nestjs/mapped-types';
import { CreateDemoraDto } from './create-demora.dto';

export class UpdateDemoraDto extends PartialType(CreateDemoraDto) {}
