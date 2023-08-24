import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginOutDto {
  @ApiProperty({ description: '用户名', example: 'xiet' })
  @IsNotEmpty({ message: '请输入用户名' })
  name: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}
