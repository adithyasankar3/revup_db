import { Test, TestingModule } from '@nestjs/testing';
import { Product_ordersController } from './product_orders.controller';
import { Product_ordersService } from './product_orders.service';

describe('Product_ordersController', () => {
  let controller: Product_ordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Product_ordersController],
      providers: [Product_ordersService],
    }).compile();

    controller = module.get<Product_ordersController>(Product_ordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
