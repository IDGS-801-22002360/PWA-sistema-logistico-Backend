import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('demoras')
export class Demora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  tiempo_demora: number;

  @Column()
  motivo: string;

  @Column()
  impacto: string;

  @Column()
  acciones_tomadas: string;

  @ManyToOne(() => Operacion, operacion => operacion.demoras)
  operacion: Operacion;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
