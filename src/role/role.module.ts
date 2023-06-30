import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Roles} from "role/role.model";
import { RoleController } from './role.controller';
import {RoleService} from "role/role.service";

@Module({
    imports: [TypeOrmModule.forFeature([Roles])],
    controllers: [RoleController],
    providers:[RoleService]
})
export class RoleModule {
}
