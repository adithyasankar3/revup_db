import { Test, TestingModule } from '@nestjs/testing';
import { Payment_reportController } from './payment_report.controller';
import { Payment_reportService } from './payment_report.service';

describe('Payment_reportController', () => {
  let controller: Payment_reportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Payment_reportController],
      providers: [Payment_reportService],
    }).compile();

    controller = module.get<Payment_reportController>(Payment_reportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
