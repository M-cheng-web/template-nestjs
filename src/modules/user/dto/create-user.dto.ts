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

export class CreateUserDto {
  @ApiProperty({ description: '账号', example: 'test1' })
  @IsNotEmpty({
    message: 'account账号不能为空',
  })
  @IsString()
  account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @MinLength(6, {
    message: '密码长度不能小于6',
  })
  @MaxLength(10, {
    message: '密码长度不能大于10',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '姓名', example: '张三' })
  @IsNotEmpty({
    message: 'name 不能为空',
  })
  @IsString()
  name: string;

  @ApiProperty({ description: '年龄' })
  @IsNotEmpty()
  @IsNumber()
  @Max(200)
  @Transform(({ value }) => parseInt(value, 10)) // 在到达管道之前对参数转换一下
  age: number;

  @ApiProperty({ description: '手机号码' })
  @IsNotEmpty()
  @IsPhoneNumber('CN', {
    message: 'phoneNumber 不是一个手机号码',
  })
  phoneNumber: string;

  @IsEmail(
    {},
    {
      message: 'email 不是一个合法邮箱',
    },
  )
  email: string;

  @ApiProperty({ description: '用户类型' })
  @IsNumber()
  userType: number;
}
