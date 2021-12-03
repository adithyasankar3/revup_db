import { Test, TestingModule } from '@nestjs/testing';
import { Product_ordersService } from './product_orders.service';

describe('Product_ordersService', () => {
  let service: Product_ordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Product_ordersService],
    }).compile();

    service = module.get<Product_ordersService>(Product_ordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
