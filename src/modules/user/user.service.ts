import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      const newGuards = this.userRepository.create(createUserDto);
      return this.userRepository.save(newGuards).then((res) => ({
        data: res,
        message: '添加成功',
      }));
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
      await this.userRepository.update(id, updateUserDto);
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
