import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "user/user.model";
import {Mechanic} from "mechanic/mechanic.model";

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
  @ManyToMany(()=>Mechanic, driver=>driver.services)
  mechanics:Mechanic[]
}
