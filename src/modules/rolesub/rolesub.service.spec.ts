import { Test, TestingModule } from '@nestjs/testing';
import { RolesubService } from './rolesub.service';

describe('RolesubService', () => {
  let service: RolesubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesubService],
    }).compile();

    service = module.get<RolesubService>(RolesubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
