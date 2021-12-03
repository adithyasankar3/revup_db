import { Test, TestingModule } from '@nestjs/testing';
import { Special_bookingController } from './special_booking.controller';
import { Special_bookingService } from './special_booking.service';

describe('Special_bookingController', () => {
  let controller: Special_bookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Special_bookingController],
      providers: [Special_bookingService],
    }).compile();

    controller = module.get<Special_bookingController>(
      Special_bookingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
