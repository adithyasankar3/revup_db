import { Test, TestingModule } from '@nestjs/testing';
import { Card_detailsService } from './card_details.service';

describe('Card_detailsService', () => {
  let service: Card_detailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Card_detailsService],
    }).compile();

    service = module.get<Card_detailsService>(Card_detailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
