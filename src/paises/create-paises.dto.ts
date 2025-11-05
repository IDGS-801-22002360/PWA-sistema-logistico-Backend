import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePaisDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @Length(2, 2)
  iso2: string;
}
