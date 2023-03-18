import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from 'user/role.enum';
import { Exclude } from 'class-transformer';

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
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.DRIVER,
  })
  role: Roles;
}
