import { Test, TestingModule } from '@nestjs/testing';
import { Driver_adminService } from './driver_admin.service';

describe('Driver_adminService', () => {
  let service: Driver_adminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Driver_adminService],
    }).compile();

    service = module.get<Driver_adminService>(Driver_adminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
