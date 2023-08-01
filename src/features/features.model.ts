import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "user/user.model";

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
  @ManyToMany(()=>User,user=>user.services)
  user:User[]
}
