import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly roleService: RoleService,
  ) {}

  /**
   * 新建用户
   */
  async create(createUserDto: CreateUserDto) {
    const userInfo = await this.userRepository.findOne({
      where: { account: createUserDto.account },
    });
    if (userInfo && userInfo.id) {
      throw new BadRequestException(`此用户已存在: ${createUserDto.account}`);
    } else {
      // 创建数据库事务,  在这里直接取得 connection, 用这个来开启事务, 然后用里面的 transactionalEntityManager 来代替操作 this.messageRepo 的操作. 如果出现异常错误, 数据库就会回退回去.
      const connection = this.userRepository.manager.connection;
      await connection.transaction(async (transactionalEntityManager) => {
        const { role } = createUserDto;
        if (!role || !role.length) {
          throw new BadRequestException(`role 数组请传入角色id`);
        }
        const roleList: Role[] = [];
        for (let i = 0; i < role.length; i++) {
          const roleId = role[i];
          const roleInfo = await this.roleService.findOne(roleId);
          if (!roleInfo) {
            throw new BadRequestException(`role 数组内请传入有效的角色id`);
          }
          roleList.push(roleInfo);
        }
        createUserDto.role = roleList;
        const newGuards = this.userRepository.create(createUserDto);
        return transactionalEntityManager.save(newGuards).then((res) => ({
          data: res,
          message: '添加成功',
        }));
      });
    }
  }

  /**
   * 根据多个条件查找多个用户
   */
  async findAll(findUserDto: FindUserDto) {
    const data = await this.userRepository.find({
      where: {
        name: Like(`%${findUserDto.name}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (findUserDto.page - 1) * findUserDto.pageSize,
      take: findUserDto.pageSize,
    });
    const total = await this.userRepository.count({
      where: {
        name: Like(`%${findUserDto.name}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  /**
   * 根据 id 查找单个用户
   */
  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  /**
   * 根据 account 查找单个用户
   */
  findOneByAccount(account: string) {
    return this.userRepository.findOne({
      where: { account },
    });
  }

  /**
   * 根据 id 更改某个用户信息
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (JSON.stringify(updateUserDto) === '{}') {
      throw new BadRequestException(`请传入要修改的参数`);
    }
    const info = await this.findOne(id);
    if (info) {
      if (updateUserDto.account && info.account !== updateUserDto.account) {
        throw new BadRequestException(`不能修改用户账号`);
      }
      const connection = this.userRepository.manager.connection;
      await connection.transaction(async (transactionalEntityManager) => {
        const { role } = updateUserDto;
        const roleList: Role[] = [];
        for (let i = 0; i < role.length; i++) {
          const roleId = role[i];
          const roleInfo = await this.roleService.findOne(roleId);
          if (!roleInfo) {
            throw new BadRequestException(`role 数组内请传入有效的角色id`);
          }
          roleList.push(roleInfo);
        }
        const user = new User();
        Object.assign(user, updateUserDto);
        // 重点：
        // 不指定id是创建新的用户，还需要填写username和password等必填的字段
        // 指定id就是更新某些字段：只关注明星，不创建新的用户，同样可用于修改
        user.id = id;
        user.role = roleList;
        return transactionalEntityManager.save(user).then((res) => ({
          data: res,
          message: '更改成功',
        }));
      });
      // await this.userRepository.update(id, updateUserDto);
    } else {
      throw new BadRequestException(`没有此用户`);
    }
  }

  /**
   * 根据 id 删除某个用户
   */
  async remove(id: number) {
    const info = await this.findOne(id);
    if (info) {
      await this.userRepository.delete(id);
    } else {
      throw new BadRequestException(`没有此用户`);
    }
  }
}
