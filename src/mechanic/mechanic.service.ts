import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "user/user.model";
import {Repository} from "typeorm";
import {Mechanic} from "mechanic/mechanic.model";
import {Features} from "features/features.model";

@Injectable()
export class MechanicService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Mechanic) private mechanicRepository: Repository<Mechanic>) {
    }

    async getAllServices(user: User) {
        const mechanic = await this.mechanicRepository.findOne({
            where: {
                user: user
            }, relations: ["services"]
        })
        return mechanic.services
    }

    async saveServices(services: Features[], user: User) {
        const driver = await this.mechanicRepository.findOne({
            where: {
                user
            },
            relations: ["user", "services"]

        })
        driver.services = services
        await this.mechanicRepository.save(driver)
        return driver
    }

    async getMechanic(id: number) {
        let data = await this.mechanicRepository.findOne({
            where: {
                user: {
                    id
                }
            },
            relations: ["user", "services", "rating"]

        })
        return data
    }


    async addAbout(user: User, about: string) {
        const mechanic = await this.mechanicRepository.findOne({
            where: {
                user
            }
        })
        mechanic.about = about
        return await this.mechanicRepository.save(mechanic)
    }


}

