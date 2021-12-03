import { Test, TestingModule } from '@nestjs/testing';
import { Add_vehicleController } from './add_vehicle.controller';
import { Add_vehicleService } from './add_vehicle.service';

describe('Add_vehicleController', () => {
  let controller: Add_vehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Add_vehicleController],
      providers: [Add_vehicleService],
    }).compile();

    controller = module.get<Add_vehicleController>(Add_vehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
