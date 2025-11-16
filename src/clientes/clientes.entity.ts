import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pais } from '../paises/paises.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id_cliente: number;

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

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({ length: 255, nullable: true, name: 'email_contacto' })
  email_contacto: string;

  @Column({ length: 200, nullable: true, name: 'contacto_nombre' })
  contacto_nombre: string;

  @Column({ length: 100, nullable: true, name: 'contacto_puesto' })
  contacto_puesto: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
