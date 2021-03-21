import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        return this.avatar
            ? `http://192.168.15.39:3333/files/${this.avatar}`
            : null;
    }
}

export default User;
