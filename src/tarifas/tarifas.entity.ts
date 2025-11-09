import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from '../proveedores/proveedores.entity';
import { Localizacion } from '../localizacion/localizacion.entity';
import { TipoServicio, TipoCarga, Incoterm } from '../common/enums/transport.enums';

@Entity('tarifas')
export class Tarifa {
  @PrimaryGeneratedColumn({ name: 'id_tarifa' })
  id_tarifa: number;

  @Column({ name: 'id_proveedor' })
  id_proveedor: number;

  @ManyToOne(() => Proveedor, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

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

  @Column({ type: 'enum', enum: Incoterm })
  incoterm: Incoterm;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio_base' })
  precio_base: string;

  @Column({ length: 3 })
  moneda: string;

  @Column({ type: 'date', name: 'fecha_vigencia_inicio' })
  fecha_vigencia_inicio: Date;

  @Column({ type: 'date', name: 'fecha_vigencia_fin' })
  fecha_vigencia_fin: Date;
}
