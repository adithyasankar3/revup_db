import { Test, TestingModule } from '@nestjs/testing';
import { Add_productController } from './add_product.controller';
import { Add_productService } from './add_product.service';

describe('Add_productController', () => {
  let controller: Add_productController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Add_productController],
      providers: [Add_productService],
    }).compile();

    controller = module.get<Add_productController>(Add_productController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
