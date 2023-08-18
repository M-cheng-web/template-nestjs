import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesubDto } from './create-rolesub.dto';

export class UpdateRolesubDto extends PartialType(CreateRolesubDto) {}
