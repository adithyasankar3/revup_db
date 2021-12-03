import { Test, TestingModule } from '@nestjs/testing';
import { Special_bookingService } from './special_booking.service';

describe('Special_bookingService', () => {
  let service: Special_bookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Special_bookingService],
    }).compile();

    service = module.get<Special_bookingService>(Special_bookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
