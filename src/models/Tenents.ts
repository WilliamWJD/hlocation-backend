import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenents')
class Tenent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rg: string;

  @Column()
  cpf: string;

  @Column()
  genre: string;

  @Column()
  profession: string;

  @Column()
  marital_status: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tenent;
