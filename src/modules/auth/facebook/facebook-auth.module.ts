import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './facebook.strategy';
import facebookConfig from '../../../config/facebook';
import { UserModule } from '../../user/user.module';
import { FacebookAuthController } from './facebook-auth.controller';
import { FacebookAuthService } from './facebook-auth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [facebookConfig],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [FacebookAuthService, FacebookStrategy],
  controllers: [FacebookAuthController],
})
export class FacebookAuthModule {}
