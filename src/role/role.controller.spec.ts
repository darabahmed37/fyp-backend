import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import Role from 'role/role.model';

describe('RoleService', () => {
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('getAllRole', () => {
    it('should return an array of all role values', () => {
      const result = roleService.getAllRole();
      expect(result).toEqual([Role.MECHANIC, Role.CUSTOMER]);
    });
  });
});
