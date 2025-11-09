import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Localizacion } from '../localizacion/localizacion.entity';
import { TipoServicio, TipoCarga } from '../common/enums/transport.enums';

@Entity('solicitudes_cotizacion_cliente')
export class SolicitudCotizacionCliente {
  @PrimaryGeneratedColumn({ name: 'id_solicitud' })
  id_solicitud: number;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ type: 'enum', enum: TipoServicio, name: 'tipo_servicio' })
  tipo_servicio: TipoServicio;

  @Column({ type: 'enum', enum: TipoCarga, name: 'tipo_carga' })
  tipo_carga: TipoCarga;

  @Column({ name: 'id_origen_localizacion' })
  id_origen_localizacion: number;

  @ManyToOne(() => Localizacion, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_origen_localizacion' })
  origen: Localizacion;

  @Column({ name: 'id_destino_localizacion' })
  id_destino_localizacion: number;

  @ManyToOne(() => Localizacion, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_destino_localizacion' })
  destino: Localizacion;

  @Column({ type: 'datetime', name: 'fecha_solicitud', nullable: true })
  fecha_solicitud: Date;

  @Column({ type: 'text', nullable: true, name: 'descripcion_mercancia' })
  descripcion_mercancia?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true, name: 'valor_estimado_mercancia' })
  valor_estimado_mercancia?: string;

  @Column({ type: 'enum', enum: ['nueva','en_proceso','cotizada','rechazada'], default: 'nueva' })
  estatus: string;
}
