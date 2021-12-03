import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bank_accountService } from './bank_account.service';
import { Bank_accountController } from './bank_account.controller';
import { Bank_account } from './entities/bank_account.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Bank_account]), MsClientModule],
  controllers: [Bank_accountController],
  providers: [Bank_accountService],
})
export class Bank_accountModule {}
