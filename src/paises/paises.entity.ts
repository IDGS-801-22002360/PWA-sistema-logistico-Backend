import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ length: 3, nullable: true })
  codigo_iso: string;
}
