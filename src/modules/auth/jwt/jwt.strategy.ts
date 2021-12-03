import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Job } from '../../../core/utils/job';
import { CachingService } from '../../../core/modules/caching/caching.service';
import { OWNER_INCLUDE_ATTRIBUTES_KEY } from '../../../decorators/owner-attributes.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    _config: ConfigService,
    private _user: UserService,
    private _cache: CachingService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get('jwt').secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    if (await this._cache.isBlackListed({ sessionId: payload.sessionId }))
      throw new UnauthorizedException();
    const { error, data } = await this._user.findRecordById(
      new Job({
        id: payload.userId,
        options: {
          attributes: { include: req[OWNER_INCLUDE_ATTRIBUTES_KEY] },
          allowEmpty: true,
        },
      }),
    );
    if (!!error || !data || !data.active) {
      throw new ForbiddenException();
    }
    return { ...data.toJSON(), ...payload };
  }
}
