import { Controller, Get } from '@nestjs/common';
import { RoleService } from 'role/role.service';
import {Public} from "utils/custom.decorator";

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @Public()
  async getAllRoles(): Promise<string[]> {
    return this.roleService.getAllRole();
  }
}
