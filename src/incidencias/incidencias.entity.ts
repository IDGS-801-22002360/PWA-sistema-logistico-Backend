import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('incidencias')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_incidencia: string;

  @Column()
  descripcion: string;

  @Column()
  gravedad: string;

  @Column()
  estado: string;

  @Column()
  resolucion: string;

  @ManyToOne(() => Operacion, operacion => operacion.incidencias)
  operacion: Operacion;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
