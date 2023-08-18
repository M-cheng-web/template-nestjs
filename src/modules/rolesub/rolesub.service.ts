import { Injectable } from '@nestjs/common';
import { CreateRolesubDto } from './dto/create-rolesub.dto';
import { UpdateRolesubDto } from './dto/update-rolesub.dto';

@Injectable()
export class RolesubService {
  create(createRolesubDto: CreateRolesubDto) {
    return 'This action adds a new rolesub';
  }

  findAll() {
    return `This action returns all rolesub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesub`;
  }

  update(id: number, updateRolesubDto: UpdateRolesubDto) {
    return `This action updates a #${id} rolesub`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesub`;
  }
}
