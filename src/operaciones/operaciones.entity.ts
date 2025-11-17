import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';
import { Cliente } from '../clientes/clientes.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Proveedor } from '../proveedores/proveedores.entity';
import { Agente } from '../agentes/agentes.entity';
import {
  TipoServicio,
  TipoCarga,
  Incoterm,
} from '../common/enums/transport.enums';
import { Demora } from '../demoras/demoras.entity';
import { Incidencia } from '../incidencias/incidencias.entity';
import { Tracking } from '../tracking/tracking.entity';

@Entity('operaciones')
export class Operacion {
  @PrimaryGeneratedColumn({ name: 'id_operacion' })
  id_operacion: number;

  @Column({ name: 'id_cotizacion', nullable: true })
  id_cotizacion?: number;

  @ManyToOne(() => Cotizacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cotizacion' })
  cotizacion?: Cotizacion;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ name: 'id_usuario_operativo' })
  id_usuario_operativo: number;

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_operativo' })
  usuario_operativo: Usuario;

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

  @Column({ type: 'timestamp', name: 'fecha_inicio_operacion', nullable: true })
  fecha_inicio_operacion?: Date;

  @Column({ type: 'date', name: 'fecha_estimada_arribo', nullable: true })
  fecha_estimada_arribo?: Date;

  @Column({ type: 'date', name: 'fecha_estimada_entrega', nullable: true })
  fecha_estimada_entrega?: Date;

  @Column({ type: 'timestamp', name: 'fecha_arribo_real', nullable: true })
  fecha_arribo_real?: Date;

  @Column({ type: 'timestamp', name: 'fecha_entrega_real', nullable: true })
  fecha_entrega_real?: Date;

  @Column({
    type: 'enum',
    enum: [
      'en_transito',
      'en_aduana',
      'entregado',
      'cancelado',
      'pendiente_documentos',
    ],
    name: 'estatus',
    default: 'pendiente_documentos',
  })
  estatus: string;

  @Column({ length: 100, name: 'numero_referencia_proveedor', nullable: true })
  numero_referencia_proveedor?: string;

  @Column({ type: 'text', name: 'notas_operacion', nullable: true })
  notas_operacion?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;

  @OneToMany(() => Demora, demora => demora.operacion)
  demoras: Demora[];

  @OneToMany(() => Incidencia, incidencia => incidencia.operacion)
  incidencias: Incidencia[];

  @OneToMany(() => Tracking, tracking => tracking.operacion)
  tracking: Tracking[];
}
