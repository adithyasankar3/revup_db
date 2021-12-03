import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template } from './entities/template.entity';

@Module({
  imports: [SequelizeModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
