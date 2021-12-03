import { Test, TestingModule } from '@nestjs/testing';
import { Ride_bookingController } from './ride_booking.controller';
import { Ride_bookingService } from './ride_booking.service';

describe('Ride_bookingController', () => {
  let controller: Ride_bookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ride_bookingController],
      providers: [Ride_bookingService],
    }).compile();

    controller = module.get<Ride_bookingController>(Ride_bookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
