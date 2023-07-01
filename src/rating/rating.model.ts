import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'user/user.model';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  from: User;
  @ManyToOne((type) => User)
  to: User;
  @Column()
  stars: number;
}
