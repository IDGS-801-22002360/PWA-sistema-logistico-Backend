import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('tracking')
export class Tracking {
  @PrimaryGeneratedColumn({ name: 'id_tracking' })
  id_tracking: number;

  @Column({ name: 'id_operacion' })
  id_operacion: number;

  @ManyToOne(() => Operacion, (operacion) => operacion.tracking)
  @JoinColumn({ name: 'id_operacion' })
  operacion: Operacion;

  @Column({ type: 'timestamp', name: 'fecha_hora_actualizacion', default: () => 'CURRENT_TIMESTAMP' })
  fecha_hora_actualizacion: Date;

  @Column({ length: 255, name: 'ubicacion_actual', nullable: true })
  ubicacion_actual: string;

  @Column({
    type: 'enum',
    enum: ['en_origen', 'en_transito', 'en_destino', 'entregado', 'aduana'],
    name: 'estatus_seguimiento'
  })
  estatus_seguimiento: string;

  @Column({ length: 100, name: 'referencia_transportista', nullable: true })
  referencia_transportista: string;

  @Column({ length: 255, name: 'nombre_transportista', nullable: true })
  nombre_transportista: string;

  @Column({ type: 'text', name: 'notas_tracking', nullable: true })
  notas_tracking: string;

  @Column({ type: 'timestamp', name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
