import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';
import { Tarifa } from '../tarifas/tarifas.entity';

@Entity('cotizacion_cargos')
export class CotizacionCargo {
  @PrimaryGeneratedColumn({ name: 'id_cargo_cotizacion' })
  id_cargo_cotizacion: number;

  @Column({ name: 'id_cotizacion' })
  id_cotizacion: number;

  @ManyToOne(() => Cotizacion, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cotizacion' })
  cotizacion: Cotizacion;

  @Column({ name: 'id_tarifa', nullable: true })
  id_tarifa?: number;

  @ManyToOne(() => Tarifa, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_tarifa' })
  tarifa?: Tarifa;

  @Column({ length: 255 })
  descripcion_cargo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: string;

  @Column({ length: 3 })
  moneda: string;

  @Column({ default: false })
  aplica_proveedor: boolean;

  @Column({ default: true })
  aplica_cliente: boolean;
}
