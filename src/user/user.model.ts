import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from 'role/role.model';
import {FeaturesService} from "features/features.service";
import {Features} from "features/features.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;
  @Column({ default: '0' })
  latitude: string;
  @Column({ default: '0' })
  longitude: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;
  @Column({
    type: 'date',
  })
  dob: Date;
  @Column()
  phoneNumber: string;

  @ManyToMany(()=>Features, feature=>feature.user)
  @JoinTable()
  services:FeaturesService[]
}
