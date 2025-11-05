import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('paises')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ default: true })
  activo: boolean;
}
