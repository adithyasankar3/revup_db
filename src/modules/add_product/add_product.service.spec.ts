import { Test, TestingModule } from '@nestjs/testing';
import { Add_productService } from './add_product.service';

describe('Add_productService', () => {
  let service: Add_productService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Add_productService],
    }).compile();

    service = module.get<Add_productService>(Add_productService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
