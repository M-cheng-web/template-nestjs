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

  async findAll() {
    const data = await this.assetRepository.find();
    return data;
  }

  async findOne(id: number) {
    const data = await this.assetRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    if (JSON.stringify(updateAssetDto) === '{}') {
      throw new BadRequestException(`请传入要修改的参数`);
    }
    const info = await this.findOne(id);
    if (info) {
      await this.assetRepository.update(id, updateAssetDto);
    } else {
      throw new BadRequestException(`没有此资产`);
    }
  }

  async remove(id: number) {
    const info = await this.findOne(id);
    if (info) {
      return this.assetRepository
        .delete(id)
        .then(() => {
          return '删除成功';
        })
        .catch(() => {
          throw new BadRequestException(`此资产正在被使用`);
        });
    } else {
      throw new BadRequestException(`没有此资产`);
    }
  }
}
