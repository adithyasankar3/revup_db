import { Test, TestingModule } from '@nestjs/testing';
import { Ride_bookingService } from './ride_booking.service';

describe('Ride_bookingService', () => {
  let service: Ride_bookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ride_bookingService],
    }).compile();

    service = module.get<Ride_bookingService>(Ride_bookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
