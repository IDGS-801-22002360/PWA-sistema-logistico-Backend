import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TipoAgente } from './agentes.enum';

@Entity('agentes')
export class Agente {
  @PrimaryGeneratedColumn({ name: 'id_agente' })
  id_agente: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 255, unique: true, name: 'email' })
  email: string;

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({
    type: 'enum',
    enum: TipoAgente,
    name: 'tipo_agente',
    nullable: false,
  })
  tipo_agente: TipoAgente;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}
