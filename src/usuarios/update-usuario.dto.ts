import { RolUsuario } from './usuario.enum';

export class UpdateUsuarioDto {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  rol?: RolUsuario;
  activo?: boolean;
}
