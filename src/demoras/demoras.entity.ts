import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('demoras')
export class Demora {
  @PrimaryGeneratedColumn({ name: 'id_demora' })
  id_demora: number;

  @Column({ name: 'id_operacion' })
  id_operacion: number;

  @ManyToOne(() => Operacion, (operacion) => operacion.demoras)
  @JoinColumn({ name: 'id_operacion' })
  operacion: Operacion;

  @Column({ type: 'datetime', name: 'fecha_hora_demora' })
  fecha_hora_demora: Date;

  @Column({ type: 'text', name: 'descripcion_demora', nullable: true })
  descripcion_demora: string;

  @Column({
    type: 'enum',
    enum: ['climatica', 'aduana', 'mecanica', 'documental', 'trafico', 'otro'],
    name: 'tipo_demora'
  })
  tipo_demora: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'costo_asociado', default: 0 })
  costo_asociado: number;

  @Column({ length: 3, name: 'moneda', nullable: true })
  moneda: string;

  @Column({ type: 'datetime', name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
