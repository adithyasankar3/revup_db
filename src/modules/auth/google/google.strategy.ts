import { Strategy } from 'passport-google-verify-token';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(_config: ConfigService, private authService: GoogleAuthService) {
    super(_config.get('google'));
  }

  async validate(parsedToken, googleId, done): Promise<any> {
    const { error, user } = await this.authService.validateGoogleUser(
      googleId,
      parsedToken,
    );
    if (!!error) {
      throw new UnauthorizedException(error);
    }
    done(null, user);
  }
}
