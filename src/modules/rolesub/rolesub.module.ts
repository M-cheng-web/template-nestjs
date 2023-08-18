import { Module } from '@nestjs/common';
import { RolesubService } from './rolesub.service';
import { RolesubController } from './rolesub.controller';

@Module({
  controllers: [RolesubController],
  providers: [RolesubService]
})
export class RolesubModule {}
