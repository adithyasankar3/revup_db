import { OmitType } from '@nestjs/swagger';
import { Card_details } from '../entities/card_details.entity';

export class CreateCard_detailsDto extends OmitType(Card_details, [
  'active',
] as const) {}
