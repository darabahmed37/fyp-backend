import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeaturesModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @Column()
  title: string;
  @Column()
  description: string;
}
