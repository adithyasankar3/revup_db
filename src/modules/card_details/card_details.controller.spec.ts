import { Test, TestingModule } from '@nestjs/testing';
import { Card_detailsController } from './card_details.controller';
import { Card_detailsService } from './card_details.service';

describe('Card_detailsController', () => {
  let controller: Card_detailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Card_detailsController],
      providers: [Card_detailsService],
    }).compile();

    controller = module.get<Card_detailsController>(Card_detailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
