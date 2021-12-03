import { Test, TestingModule } from '@nestjs/testing';
import { Driver_adminController } from './driver_admin.controller';
import { Driver_adminService } from './driver_admin.service';

describe('Driver_adminController', () => {
  let controller: Driver_adminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Driver_adminController],
      providers: [Driver_adminService],
    }).compile();

    controller = module.get<Driver_adminController>(Driver_adminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
