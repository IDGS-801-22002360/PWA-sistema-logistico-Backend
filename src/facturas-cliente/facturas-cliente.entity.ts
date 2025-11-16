import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Operacion } from '../operaciones/operaciones.entity';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';

@Entity('facturas_cliente')
export class FacturaCliente {
  @PrimaryGeneratedColumn({ name: 'id_factura_cliente' })
  id_factura_cliente: number;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ name: 'id_operacion', nullable: true })
  id_operacion?: number;

  @ManyToOne(() => Operacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_operacion' })
  operacion?: Operacion;

  @Column({ name: 'id_cotizacion', nullable: true })
  id_cotizacion?: number;

  @ManyToOne(() => Cotizacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cotizacion' })
  cotizacion?: Cotizacion;

  @Column({ name: 'numero_factura', length: 100, unique: true })
  numero_factura: string;

  @Column({ type: 'timestamp', name: 'fecha_emision', default: () => 'CURRENT_TIMESTAMP' })
  fecha_emision: Date;

  @Column({ type: 'date', name: 'fecha_vencimiento' })
  fecha_vencimiento: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'monto_total' })
  monto_total: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'monto_pagado', default: 0 })
  monto_pagado: string;

  @Column({ length: 3 })
  moneda: string;

  @Column({ type: 'enum', enum: ['pendiente', 'pagada', 'vencida', 'cancelada'], default: 'pendiente' })
  estatus: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'timestamp', name: 'fecha_pago', nullable: true })
  fecha_pago?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
