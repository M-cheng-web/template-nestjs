import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    if (JSON.stringify(updateRoleDto) === '{}') {
      throw new BadRequestException(`请传入要修改的参数`);
    }
    const info = await this.findOne(id);
    if (info) {
      if (updateRoleDto.roleName && info.roleName !== updateRoleDto.roleName) {
        throw new BadRequestException(`不能修改角色名称`);
      }
      await this.roleRepository.update(id, updateRoleDto);
    } else {
      throw new BadRequestException(`没有此用户`);
    }
  }

  async remove(id: number) {
    const info = await this.findOne(id);
    if (info) {
      return this.roleRepository
        .delete(id)
        .then(() => {
          return '删除成功';
        })
        .catch(() => {
          throw new BadRequestException(`此角色正在被使用`);
        });
    } else {
      throw new BadRequestException(`没有此角色`);
    }
  }
}
