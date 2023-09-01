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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/common/decorator';
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: '新建角色',
    description: '请求该接口需要amdin权限',
  })
  @Role('admin')
  @UseGuards(UserGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: '查询所有角色列表',
    description: '请求该接口需要登录',
  })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id查询角色',
    description: '请求该接口需要登录',
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更改角色',
    description: '请求该接口需要登录',
  })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除角色',
    description: '请求该接口需要登录',
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
