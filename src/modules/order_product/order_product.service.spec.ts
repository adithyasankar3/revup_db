import { Test, TestingModule } from '@nestjs/testing';
import { Order_productService } from './order_product.service';

describe('Order_productService', () => {
  let service: Order_productService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Order_productService],
    }).compile();

    service = module.get<Order_productService>(Order_productService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
