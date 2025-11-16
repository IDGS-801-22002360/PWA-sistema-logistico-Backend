import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pais } from '../paises/paises.entity';
import { Localizacion } from '../localizacion/localizacion.entity';
import { TipoServicio } from './proveedor.enum';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn({ name: 'id_proveedor' })
  id_proveedor: number;

  @Column({ length: 255, name: 'nombre_empresa' })
  nombre_empresa: string;

  @Column({ length: 20, unique: true })
  rfc: string;

  @Column({ name: 'id_pais', nullable: true })
  id_pais: number;

  @ManyToOne(() => Pais, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;

  @Column({ name: 'id_localizacion', nullable: true })
  id_localizacion: number;

  @ManyToOne(() => Localizacion, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_localizacion' })
  localizacion: Localizacion;

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({ length: 255, nullable: true, name: 'email_contacto' })
  email_contacto: string;

  @Column({ length: 200, nullable: true, name: 'contacto_nombre' })
  contacto_nombre: string;

  @Column({
    type: 'enum',
    enum: TipoServicio,
    name: 'tipo_servicio_ofrecido',
    nullable: false,
  })
  tipo_servicio_ofrecido: TipoServicio;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
