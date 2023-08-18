import { Test, TestingModule } from '@nestjs/testing';
import { RolesubController } from './rolesub.controller';
import { RolesubService } from './rolesub.service';

describe('RolesubController', () => {
  let controller: RolesubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesubController],
      providers: [RolesubService],
    }).compile();

    controller = module.get<RolesubController>(RolesubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
