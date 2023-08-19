import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "user/user.model";
import {Repository} from "typeorm";
import {Driver} from "driver/driver.model";
import {Features} from "features/features.model";

@Injectable()
export class DriverService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Driver) private driverRepo: Repository<Driver>) {
    }

    getAllServices(user: User) {
        return this.driverRepo.find({
            where: {
                user: user
            }
        })
    }

    async saveServices(services: Features[], user: User) {
        const driver = await this.driverRepo.findOne({
            where: {
                user
            },
            relations:["user","services"]

        })
        driver.services = services
        await this.driverRepo.save(driver)
        return driver
    }
}