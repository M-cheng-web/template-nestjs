import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserFindPipe } from './pipe/user.pipe';
import { UserGuard } from './guard/user.guard';
import { Role } from 'src/common/decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 新建管理员账号 - 此api不会暴露给前端
   * 管理员的 type = 4
   */
  @Post('/createAdmin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.userType = 4;
    return this.userService.create(createUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UsePipes(new UserFindPipe())
  @ApiOperation({
    summary: '查询批量数据',
    description: '参数任意传，支持分页，但后端会有参数校验哦',
  })
  findAll(query: FindUserDto) {
    return this.userService.findAll(query);
  }

  /**
   * 针对此接口，加入了jwt判断 以及 权限等级判断
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  @ApiOperation({
    summary: '根据id查询单个数据',
    description: '请求该接口需要amdin权限',
  })
  @Role('admin')
  @UseGuards(UserGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.userService.findOne(+id);
  }

  findOneByAccount(account: string) {
    return this.userService.findOneByAccount(account);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
