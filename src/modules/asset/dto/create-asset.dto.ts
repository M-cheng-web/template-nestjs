import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAssetDto {
  @ApiProperty({ description: '资产名(不唯一)', example: 'macbook pro' })
  @IsNotEmpty({
    message: '资产名 assetName 不能为空',
  })
  @IsString()
  assetName: string;

  @ApiProperty({ description: '资产类型' })
  @IsNotEmpty({
    message: '资产类型 type 不能为空',
  })
  @IsString()
  type: string;

  @ApiProperty({ description: '资产绑定人' })
  @IsString()
  @IsOptional()
  user: any;

  @ApiProperty({ description: '当前绑定人 - 开始时间' })
  @IsString()
  @IsOptional()
  userUseTime: string;

  @ApiProperty({ description: '当前绑定人 - 结束时间' })
  @IsString()
  @IsOptional()
  userOutTime: string;

  @ApiProperty({ description: '资产绑定历史' })
  @IsString()
  @IsOptional()
  userUseList: string;

  @ApiProperty({ description: '资产说明' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: '是否为激活状态' })
  @IsString()
  @IsOptional()
  isActive: boolean;
}
