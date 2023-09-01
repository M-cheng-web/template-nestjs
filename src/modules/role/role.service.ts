import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleInfo = await this.roleRepository.findOne({
      where: { roleName: createRoleDto.roleName },
    });
    if (roleInfo && roleInfo.id) {
      throw new BadRequestException(`此角色已存在: ${createRoleDto.roleName}`);
    } else {
      const newGuards = this.roleRepository.create(createRoleDto);
      return this.roleRepository.save(newGuards).then((res) => ({
        data: res,
        message: '添加成功',
      }));
    }
  }

  async findAll() {
    const data = await this.roleRepository.find();
    return data;
  }

  async findOne(id: number) {
    const data = await this.roleRepository.findOne({ where: { id } });
    return data;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    const info = await this.findOne(id);
    if (info) {
      await this.roleRepository.delete(id);
    } else {
      throw new BadRequestException(`没有此角色`);
    }
  }
}
