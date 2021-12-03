import { Test, TestingModule } from '@nestjs/testing';
import { Coupon_codeService } from './coupon_code.service';

describe('Coupon_codeService', () => {
  let service: Coupon_codeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Coupon_codeService],
    }).compile();

    service = module.get<Coupon_codeService>(Coupon_codeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
