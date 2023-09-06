import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    private readonly userService: UserService,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    let user = null;
    if (createAssetDto.user) {
      const userInfo = await this.userService.findOne(createAssetDto.user);
      if (!userInfo) {
        throw new BadRequestException(
          `请传入正确的用户id: ${createAssetDto.user}`,
        );
      }
      user = userInfo;
    }
    createAssetDto.user = user;
    const newGuards = this.assetRepository.create(createAssetDto);
    return this.assetRepository.save(newGuards).then((res) => ({
      data: res,
      message: '添加成功',
    }));
  }

  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
