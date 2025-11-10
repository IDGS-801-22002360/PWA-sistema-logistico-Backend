import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoRelacionadoDto } from './create-documento.dto';

export class UpdateDocumentoRelacionadoDto extends PartialType(CreateDocumentoRelacionadoDto) {}
