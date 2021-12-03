import { Test, TestingModule } from '@nestjs/testing';
import { Ride_detailsController } from './ride_details.controller';
import { Ride_detailsService } from './ride_details.service';

describe('Ride_detailsController', () => {
  let controller: Ride_detailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ride_detailsController],
      providers: [Ride_detailsService],
    }).compile();

    controller = module.get<Ride_detailsController>(Ride_detailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
