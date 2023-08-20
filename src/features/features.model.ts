import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "user/user.model";
import {Driver} from "driver/driver.model";

@Entity()
export class Features {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToMany(()=>Driver, driver=>driver.services)
  drivers:Driver[]
}
