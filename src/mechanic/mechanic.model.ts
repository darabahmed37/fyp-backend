import {Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Features} from "features/features.model";
import {User} from "user/user.model";
import {Rating} from "rating/rating.model";

@Entity()
export class Mechanic {
    @PrimaryGeneratedColumn()
    id: number
    @OneToOne(() => User
    )
    @JoinColumn()
    user: User
    @ManyToMany(() => Features, feature => feature.mechanics)
    @JoinTable()
    services: Features[]
    @OneToMany(() => Rating, rating => rating.to)
    rating: Rating[]
}