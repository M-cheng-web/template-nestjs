import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户账号', example: 'admin' })
  @IsNotEmpty({ message: '请输入用户账号' })
  account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}

export class AuthTokenRo {
  @ApiProperty({
    description: '授权token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjYmRiNzA1LTE4NDYtNDljYi1iN2I1LWJjN2ZlMmNhMjcxZiIsInVzZXJuYW1lIjoieGlldCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0OTgxMTk4NiwiZXhwIjoxNjQ5ODI2Mzg2fQ.h0ksMFyz158NRnX5OsLnuR9B1XPtOETsxqy1hiCJSSE',
  })
  public token: string;
}
