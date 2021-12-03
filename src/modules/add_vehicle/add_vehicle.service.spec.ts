import { Test, TestingModule } from '@nestjs/testing';
import { Add_vehicleService } from './add_vehicle.service';

describe('Add_vehicleService', () => {
  let service: Add_vehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Add_vehicleService],
    }).compile();

    service = module.get<Add_vehicleService>(Add_vehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
