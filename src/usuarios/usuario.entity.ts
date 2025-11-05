import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'ventas', 'operaciones', 'cliente'],
    default: 'cliente',
  })
  rol: 'admin' | 'ventas' | 'operaciones' | 'cliente';

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'datetime' })
  fecha_creacion: Date;
}
