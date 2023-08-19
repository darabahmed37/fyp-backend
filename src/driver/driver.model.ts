import {Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Features} from "features/features.model";
import {FeaturesService} from "features/features.service";
import {User} from "user/user.model";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id:number
    @OneToOne(() => User
    )
    @JoinColumn()
    user: User
    @ManyToMany(() => Features, feature => feature.user)
    @JoinTable()
    services: Features[]
}