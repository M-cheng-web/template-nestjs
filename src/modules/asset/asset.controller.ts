import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { UserGuard } from 'src/common/user.guard';
import { Role } from 'src/common/decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  /**
   * 针对此接口，加入了jwt判断 以及 权限等级判断
   */
  @Post()
  @ApiParam({ name: 'id', description: '用户id', required: true })
  @ApiOperation({
    summary: '根据id查询单个数据',
    description: '请求该接口需要amdin权限',
  })
  @Role('admin')
  @UseGuards(UserGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.remove(+id);
  }
}
