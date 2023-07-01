import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Role from 'role/role.model';

@Injectable()
export class RoleService {
  getAllRole(): string[] {
    return Object.values(Role);
  }
}
