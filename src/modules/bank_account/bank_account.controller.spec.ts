import { Test, TestingModule } from '@nestjs/testing';
import { Bank_accountController } from './bank_account.controller';
import { Bank_accountService } from './bank_account.service';

describe('Bank_accountController', () => {
  let controller: Bank_accountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Bank_accountController],
      providers: [Bank_accountService],
    }).compile();

    controller = module.get<Bank_accountController>(Bank_accountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
