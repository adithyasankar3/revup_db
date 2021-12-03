import { Test, TestingModule } from '@nestjs/testing';
import { Coupon_codeController } from './coupon_code.controller';
import { Coupon_codeService } from './coupon_code.service';

describe('Coupon_codeController', () => {
  let controller: Coupon_codeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Coupon_codeController],
      providers: [Coupon_codeService],
    }).compile();

    controller = module.get<Coupon_codeController>(Coupon_codeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
