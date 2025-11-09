import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Localizacion } from '../localizacion/localizacion.entity';
import { Proveedor } from '../proveedores/proveedores.entity';
import { Agente } from '../agentes/agentes.entity';
import { SolicitudCotizacionCliente } from '../solicitudes/solicitudes.entity';
import { TipoServicio, TipoCarga, Incoterm } from '../common/enums/transport.enums';

@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn({ name: 'id_cotizacion' })
  id_cotizacion: number;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ name: 'id_usuario_ventas' })
  id_usuario_ventas: number;

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_ventas' })
  usuario_ventas: Usuario;

  @Column({ name: 'id_usuario_operativo', nullable: true })
  id_usuario_operativo?: number;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_operativo' })
  usuario_operativo?: Usuario;

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

  @Column({ name: 'id_proveedor' })
  id_proveedor: number;

  @ManyToOne(() => Proveedor, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @Column({ name: 'id_agente', nullable: true })
  id_agente?: number;

  @ManyToOne(() => Agente, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_agente' })
  agente?: Agente;

  @Column({ type: 'enum', enum: TipoServicio, name: 'tipo_servicio' })
  tipo_servicio: TipoServicio;

  @Column({ type: 'enum', enum: TipoCarga, name: 'tipo_carga' })
  tipo_carga: TipoCarga;

  @Column({ type: 'enum', enum: Incoterm })
  incoterm: Incoterm;

  @Column({ type: 'datetime', name: 'fecha_solicitud', nullable: true })
  fecha_solicitud: Date;

  @Column({ type: 'date', name: 'fecha_estimada_arribo', nullable: true })
  fecha_estimada_arribo?: Date;

  @Column({ type: 'date', name: 'fecha_estimada_entrega', nullable: true })
  fecha_estimada_entrega?: Date;

  @Column({ type: 'text', nullable: true, name: 'descripcion_mercancia' })
  descripcion_mercancia?: string;

  @Column({
    type: 'enum',
    enum: ['pendiente','aprobada','rechazada','caducada','enviada'],
    default: 'pendiente',
  })
  estatus: string;

  @Column({ type: 'text', nullable: true, name: 'motivo_rechazo' })
  motivo_rechazo?: string;

  @Column({ type: 'datetime', name: 'fecha_aprobacion_rechazo', nullable: true })
  fecha_aprobacion_rechazo?: Date;

  @CreateDateColumn({ type: 'datetime', name: 'fecha_creacion' })
  fecha_creacion: Date;

  @Column({ name: 'id_solicitud_cliente', nullable: true })
  id_solicitud_cliente?: number;

  @ManyToOne(() => SolicitudCotizacionCliente, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_solicitud_cliente' })
  solicitud_cliente?: SolicitudCotizacionCliente;
}
