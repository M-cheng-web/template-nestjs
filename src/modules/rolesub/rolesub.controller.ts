import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesubService } from './rolesub.service';
import { CreateRolesubDto } from './dto/create-rolesub.dto';
import { UpdateRolesubDto } from './dto/update-rolesub.dto';

@Controller('rolesub')
export class RolesubController {
  constructor(private readonly rolesubService: RolesubService) {}

  @Post()
  create(@Body() createRolesubDto: CreateRolesubDto) {
    return this.rolesubService.create(createRolesubDto);
  }

  @Get()
  findAll() {
    return this.rolesubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolesubDto: UpdateRolesubDto) {
    return this.rolesubService.update(+id, updateRolesubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesubService.remove(+id);
  }
}
