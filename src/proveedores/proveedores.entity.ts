import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ default: true })
  activo: boolean;
}
