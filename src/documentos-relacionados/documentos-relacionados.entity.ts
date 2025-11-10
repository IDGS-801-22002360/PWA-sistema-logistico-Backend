import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';
import { Operacion } from '../operaciones/operaciones.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('documentos_relacionados')
export class DocumentoRelacionado {
  @PrimaryGeneratedColumn({ name: 'id_documento' })
  id_documento: number;

  @Column({ name: 'id_cotizacion', nullable: true })
  id_cotizacion?: number;

  @ManyToOne(() => Cotizacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cotizacion' })
  cotizacion?: Cotizacion;

  @Column({ name: 'id_operacion', nullable: true })
  id_operacion?: number;

  @ManyToOne(() => Operacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_operacion' })
  operacion?: Operacion;

  @Column({ name: 'nombre_documento', length: 255 })
  nombre_documento: string;

  @Column({ type: 'enum', enum: ['BL', 'AWB', 'carta_porte', 'packing_list', 'factura_comercial', 'certificado_origen', 'pedimento', 'otro'], name: 'tipo_documento' })
  tipo_documento: string;

  @Column({ name: 'url_archivo', length: 2048 })
  url_archivo: string;

  @Column({ type: 'datetime', name: 'fecha_carga', default: () => 'CURRENT_TIMESTAMP' })
  fecha_carga: Date;

  @Column({ name: 'id_usuario_carga' })
  id_usuario_carga: number;

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_carga' })
  usuario_carga: Usuario;
}
