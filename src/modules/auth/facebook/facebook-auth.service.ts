import { Injectable } from '@nestjs/common';
import { Job } from '../../../core/utils/job';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

export interface AuthResponse {
  error?: any;
  user?: User;
}

@Injectable()
export class FacebookAuthService {
  constructor(private _user: UserService) {}

  async validateFacebookUser(
    facebookId: string,
    info: any,
  ): Promise<AuthResponse> {
    let user;
    const { error: findError, data: findUser } = await this._user.findOneRecord(
      new Job({
        options: {
          where: { facebook_id: facebookId },
          allowEmpty: true,
        },
      }),
    );
    if (!!findError) {
      return { error: findError };
    }
    if (!!findUser) user = findUser;
    else {
      const { error, data } = await this._user.findOrCreate(
        new Job({
          body: {
            first_name: info?.first_name,
            last_name: info?.last_name,
            email: info?.email,
            provider: 'Facebook',
            facebook_id: facebookId,
          },
          options: {
            where: { email: info?.email },
          },
        }),
      );
      if (!!error) {
        return { error };
      }
      user = data;
    }
    if (!user.active) {
      return { error: 'Account is inactive' };
    }
    user.facebook_id = facebookId;
    user.last_login_at = Date.now();
    await user.save();
    return { error: false, user };
  }
}
