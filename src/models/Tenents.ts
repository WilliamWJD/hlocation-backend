import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tenent;
