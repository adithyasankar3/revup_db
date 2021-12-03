import { Test, TestingModule } from '@nestjs/testing';
import { Customer_adminController } from './customer_admin.controller';
import { Customer_adminService } from './customer_admin.service';

describe('Customer_adminController', () => {
  let controller: Customer_adminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Customer_adminController],
      providers: [Customer_adminService],
    }).compile();

    controller = module.get<Customer_adminController>(Customer_adminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
