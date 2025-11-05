import { RolUsuario } from './usuario.enum';

export class CreateUsuarioDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: RolUsuario;
  activo?: boolean;
}
