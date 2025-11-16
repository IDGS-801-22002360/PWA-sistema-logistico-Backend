import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Operacion } from '../operaciones/operaciones.entity';

@Entity('incidencias')
export class Incidencia {
  @PrimaryGeneratedColumn({ name: 'id_incidencia' })
  id_incidencia: number;

  @Column({ name: 'id_operacion' })
  id_operacion: number;

  @ManyToOne(() => Operacion, (incidencia) => incidencia.incidencias)
  @JoinColumn({ name: 'id_operacion' })
  operacion: Operacion;

  @Column({ type: 'datetime', name: 'fecha_hora_incidencia' })
  fecha_hora_incidencia: Date;

  @Column({ type: 'text', name: 'descripcion_incidencia' })
  descripcion_incidencia: string;

  @Column({
    type: 'enum',
    enum: ['daño_mercancia', 'extravio_parcial', 'extravio_total', 'robo', 'error_documentacion', 'otro'],
    name: 'tipo_incidencia'
  })
  tipo_incidencia: string;

  @Column({
    type: 'enum',
    enum: ['reportada', 'en_revision', 'resuelta', 'escalada'],
    name: 'estatus',
    default: 'reportada'
  })
  estatus: string;

  @Column({ type: 'datetime', name: 'fecha_resolucion', nullable: true })
  fecha_resolucion: Date;

  @Column({ type: 'text', name: 'comentarios_resolucion', nullable: true })
  comentarios_resolucion: string;

  @Column({ type: 'datetime', name: 'fecha_registro', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
