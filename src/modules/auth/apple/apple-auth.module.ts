import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppleStrategy } from './apple.strategy';
import appleConfig from '../../../config/apple';
import { UserModule } from '../../user/user.module';
import { AppleAuthController } from './apple-auth.controller';
import { AppleAuthService } from './apple-auth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appleConfig],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [AppleAuthService, AppleStrategy],
  controllers: [AppleAuthController],
})
export class AppleAuthModule {}
