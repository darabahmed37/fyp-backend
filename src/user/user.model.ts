import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Roles } from 'role/role.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  @Exclude()
  password: string;
  @Column({ default: '0' })
  latitude: string;
  @Column({ default: '0' })
  longitude: string;
  @ManyToOne(() => Roles, (role) => role.id, {
    onDelete: 'CASCADE',
  })
  role: Roles;
}
