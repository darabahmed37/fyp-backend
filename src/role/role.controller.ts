import {Controller, Get} from '@nestjs/common';
import {Roles} from "role/role.model";
import {RoleService} from "role/role.service";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @Get()
    async getAllRoles(): Promise<Roles[]> {
        return this.roleService.getAllRole()
    }
}
