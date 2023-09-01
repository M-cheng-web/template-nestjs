import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPhoneNumber,
  IsEmail,
  MinLength,
  MaxLength,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名(唯一)', example: '机库管理员' })
  @IsNotEmpty({
    message: 'name 不能为空',
  })
  @IsString()
  roleName: string;
}
