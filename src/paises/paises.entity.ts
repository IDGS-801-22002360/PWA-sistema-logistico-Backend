import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn({ name: 'id_pais' })
  id: number;

  @Column({ name: 'nombre_pais', type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ name: 'codigo_iso2', type: 'varchar', length: 2, unique: true })
  iso2: string;
}
