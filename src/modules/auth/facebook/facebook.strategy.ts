import * as Strategy from 'passport-facebook-token';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FacebookAuthService } from './facebook-auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    _config: ConfigService,
    private authService: FacebookAuthService,
  ) {
    super(_config.get('facebook'));
  }

  async validate(accessToken, refreshToken, profile, done): Promise<any> {
    const { error, user } = await this.authService.validateFacebookUser(
      profile.id,
      profile._json,
    );
    if (!!error) {
      throw new UnauthorizedException(error);
    }
    done(null, user);
  }
}
