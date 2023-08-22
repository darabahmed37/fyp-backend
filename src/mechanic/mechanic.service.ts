import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "user/user.model";
import {Repository} from "typeorm";
import {Mechanic} from "mechanic/mechanic.model";
import {Features} from "features/features.model";

@Injectable()
export class MechanicService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Mechanic) private driverRepo: Repository<Mechanic>) {
    }

    async getAllServices(user: User) {
        const mechanic = await this.driverRepo.findOne({
            where: {
                user: user
            }, relations: ["services"]
        })
        return mechanic.services
    }

    async saveServices(services: Features[], user: User) {
        const driver = await this.driverRepo.findOne({
            where: {
                user
            },
            relations: ["user", "services"]

        })
        driver.services = services
        await this.driverRepo.save(driver)
        return driver
    }

    async getMechanic(id:number) {
        return await this.driverRepo.findOne({
            where: {
                id
            },
            relations: ["user", "services","rating"]

        })
    }


}

