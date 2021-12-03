import { Test, TestingModule } from '@nestjs/testing';
import { Customer_adminService } from './customer_admin.service';

describe('Customer_adminService', () => {
  let service: Customer_adminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Customer_adminService],
    }).compile();

    service = module.get<Customer_adminService>(Customer_adminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
