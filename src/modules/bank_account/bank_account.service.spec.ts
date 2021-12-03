import { Test, TestingModule } from '@nestjs/testing';
import { Bank_accountService } from './bank_account.service';

describe('Bank_accountService', () => {
  let service: Bank_accountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Bank_accountService],
    }).compile();

    service = module.get<Bank_accountService>(Bank_accountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
