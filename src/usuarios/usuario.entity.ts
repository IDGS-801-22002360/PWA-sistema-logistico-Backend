import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { RolUsuario } from './usuario.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol: RolUsuario;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
