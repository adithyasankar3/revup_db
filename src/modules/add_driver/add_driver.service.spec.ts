import { Test, TestingModule } from '@nestjs/testing';
import { Add_driverService } from './add_driver.service';

describe('Add_driverService', () => {
  let service: Add_driverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Add_driverService],
    }).compile();

    service = module.get<Add_driverService>(Add_driverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
