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

     saveServices(services: Features[], user: User) {

        return  this.driverRepo.update({
            user: user
        }, {
            services: services
        })
    }
}