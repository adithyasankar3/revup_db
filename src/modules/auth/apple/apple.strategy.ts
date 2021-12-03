import { Strategy } from 'passport-apple-verify-token';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppleAuthService } from './apple-auth.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy) {
  constructor(_config: ConfigService, private authService: AppleAuthService) {
    super(_config.get('apple'));
  }

  async validate(parsedToken, appleId, done): Promise<any> {
    const { error, user } = await this.authService.validateAppleUser(
      appleId,
      parsedToken,
    );
    if (!!error) {
      throw new UnauthorizedException(error);
    }
    done(null, user);
  }
}
