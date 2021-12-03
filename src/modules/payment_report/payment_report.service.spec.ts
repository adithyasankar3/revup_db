import { Test, TestingModule } from '@nestjs/testing';
import { Payment_reportService } from './payment_report.service';

describe('Payment_reportService', () => {
  let service: Payment_reportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Payment_reportService],
    }).compile();

    service = module.get<Payment_reportService>(Payment_reportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
