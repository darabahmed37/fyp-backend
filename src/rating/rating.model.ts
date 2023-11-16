import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'user/user.model';
import { Mechanic } from 'mechanic/mechanic.model';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  from: User;
  @ManyToOne(() => Mechanic)
  to: Mechanic;
  @Column()
  stars: number;
}
