import { Test, TestingModule } from '@nestjs/testing';
import { Order_productController } from './order_product.controller';
import { Order_productService } from './order_product.service';

describe('Order_productController', () => {
  let controller: Order_productController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Order_productController],
      providers: [Order_productService],
    }).compile();

    controller = module.get<Order_productController>(Order_productController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
