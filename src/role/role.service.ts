import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Roles} from "role/role.model";
import {Repository} from "typeorm";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Roles) private roleRepository: Repository<Roles>) {
    }

    async getAllRole(): Promise<Roles[]> {
        return await this.roleRepository.find()
    }
}