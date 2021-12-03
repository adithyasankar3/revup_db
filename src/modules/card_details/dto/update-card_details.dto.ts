import { PartialType } from '@nestjs/swagger';
import { Card_details } from '../entities/card_details.entity';

export class UpdateCard_detailsDto extends PartialType(Card_details) {}
