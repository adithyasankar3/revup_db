import { Injectable } from '@nestjs/common';
import { Job } from '../../../core/utils/job';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

export interface AuthResponse {
  error?: any;
  user?: User;
}

@Injectable()
export class GoogleAuthService {
  constructor(private _user: UserService) {}

  async validateGoogleUser(googleId: string, info: any): Promise<AuthResponse> {
    let user;
    const { error: findError, data: findUser } = await this._user.findOneRecord(
      new Job({
        options: {
          where: { google_id: googleId },
          allowEmpty: true,
        },
      }),
    );
    if (!!findError) {
      return { error: findError };
    }
    if (!!findUser) user = findUser;
    else {
      const email = info?.email;
      const name = info?.name || '';
      const nameArray = name.split(' ');
      const { error, data } = await this._user.findOrCreate(
        new Job({
          body: {
            first_name: nameArray[0],
            last_name: nameArray.slice(1).join(' '),
            email,
            provider: 'Google',
            google_id: googleId,
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
    user.google_id = googleId;
    user.last_login_at = Date.now();
    await user.save();
    return { error: false, user };
  }
}
