import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Propertie from '@modules/properties/infra/typeorm/entities/Propertie';
import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('locations')
class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Tenent)
  @JoinColumn({ name: 'tenant_id' })
  tenent: Tenent;

  @Column()
  tenant_id: string;

  @OneToOne(() => Propertie)
  @JoinColumn({ name: 'propertie_id' })
  propertie: Propertie;

  @Column()
  propertie_id: string;

  @Column()
  date_start: Date;

  @Column()
  date_end: Date;
}

export default Location;
