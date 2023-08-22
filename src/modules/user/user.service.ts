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

  create(createUserDto: CreateUserDto) {
    const newGuards = this.userRepository.create(createUserDto);
    return this.userRepository.save(newGuards).then((res) => {
      return {
        data: res,
        message: '添加成功',
      };
    });
  }

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

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const info = await this.findOne(id);
    if (info) {
      if (JSON.stringify(updateUserDto) === '{}') {
        throw new BadRequestException(`请传入要修改的参数`);
      }
      await this.userRepository.update(id, updateUserDto);
    } else {
      throw new BadRequestException(`没有此用户`);
    }
  }

  async remove(id: number) {
    const info = await this.findOne(id);
    if (info) {
      await this.userRepository.delete(id);
    } else {
      throw new BadRequestException(`没有此用户`);
    }
  }
}
