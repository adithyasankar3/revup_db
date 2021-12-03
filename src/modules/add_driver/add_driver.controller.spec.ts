import { Test, TestingModule } from '@nestjs/testing';
import { Add_driverController } from './add_driver.controller';
import { Add_driverService } from './add_driver.service';

describe('Add_driverController', () => {
  let controller: Add_driverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Add_driverController],
      providers: [Add_driverService],
    }).compile();

    controller = module.get<Add_driverController>(Add_driverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
