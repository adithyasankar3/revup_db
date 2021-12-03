import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Country } from './entities/country.entity';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
