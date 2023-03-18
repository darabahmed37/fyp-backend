import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'user/user.model';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  comment: string;
  @ManyToOne(() => User)
  from: User;
  @ManyToOne(() => User)
  to: User;
}
