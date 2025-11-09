import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pais } from '../paises/paises.entity';
import { TipoUbicacion } from './localizacion.enum';

@Entity('localizaciones')
export class Localizacion {
  @PrimaryGeneratedColumn({ name: 'id_localizacion' })
  id_localizacion: number;

  @Column({ name: 'id_pais', nullable: false })
  id_pais: number;

  @ManyToOne(() => Pais, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;

  @Column({ length: 100, name: 'nombre_ciudad' })
  nombre_ciudad: string;

  @Column({
    type: 'enum',
    enum: TipoUbicacion,
    name: 'tipo_ubicacion',
    nullable: false,
  })
  tipo_ubicacion: TipoUbicacion;

  @Column({ length: 10, nullable: true, name: 'codigo_iata_icao' })
  codigo_iata_icao?: string;

  @Column({ length: 255, nullable: true })
  direccion?: string;
}
