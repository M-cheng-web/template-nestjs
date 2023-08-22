import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class FindUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '页码' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @ApiProperty({ description: '一页条数' })
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  @IsNumber({}, { message: 'pageSize IsNumber' })
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number;
}
