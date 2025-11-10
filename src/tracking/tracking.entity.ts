import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('tracking')
export class Tracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ubicacion: string;

  @Column()
  estado: string;

  @Column({ type: 'text', nullable: true })
  comentarios: string;

  @Column()
  fecha_evento: Date;

  @Column({ name: 'operacion_id' })
  operacionId: number;

  @ManyToOne(() => Operacion, (operacion) => operacion.tracking)
  @JoinColumn({ name: 'operacion_id' })
  operacion: Operacion;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
