import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * PartialType: 将所有参数置为可选
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
