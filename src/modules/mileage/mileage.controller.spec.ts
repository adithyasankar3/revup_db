import { Test, TestingModule } from '@nestjs/testing';
import { MileageController } from './mileage.controller';
import { MileageService } from './mileage.service';

describe('MileageController', () => {
  let controller: MileageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MileageController],
      providers: [MileageService],
    }).compile();

    controller = module.get<MileageController>(MileageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
