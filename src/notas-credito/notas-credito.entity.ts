import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FacturaCliente } from '../facturas-cliente/facturas-cliente.entity';

@Entity('notas_credito')
export class NotaCredito {
  @PrimaryGeneratedColumn({ name: 'id_nota_credito' })
  id_nota_credito: number;

  @Column({ name: 'id_factura_cliente' })
  id_factura_cliente: number;

  @ManyToOne(() => FacturaCliente, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_factura_cliente' })
  factura_cliente: FacturaCliente;

  @Column({ name: 'numero_nota_credito', length: 100, unique: true })
  numero_nota_credito: string;

  @Column({
    type: 'timestamp',
    name: 'fecha_emision',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_emision: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monto: string;

  @Column({ length: 3 })
  moneda: string;

  @Column({ type: 'text', nullable: true })
  motivo?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
