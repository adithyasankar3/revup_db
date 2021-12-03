import { Test, TestingModule } from '@nestjs/testing';
import { Ride_detailsService } from './ride_details.service';

describe('Ride_detailsService', () => {
  let service: Ride_detailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ride_detailsService],
    }).compile();

    service = module.get<Ride_detailsService>(Ride_detailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
