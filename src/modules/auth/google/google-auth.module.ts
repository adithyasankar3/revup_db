import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import googleConfig from '../../../config/google';
import { UserModule } from '../../user/user.module';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleConfig],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [GoogleAuthService, GoogleStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
