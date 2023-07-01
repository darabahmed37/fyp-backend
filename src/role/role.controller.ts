import { Controller, Get } from '@nestjs/common';
import { RoleService } from 'role/role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<string[]> {
    return this.roleService.getAllRole();
  }
}
