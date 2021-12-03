import { Injectable } from '@nestjs/common';
import { Job } from '../../../core/utils/job';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

export interface AuthResponse {
  error?: any;
  user?: User;
}

@Injectable()
export class AppleAuthService {
  constructor(private _user: UserService) {}

  async validateAppleUser(appleId: string, info: any): Promise<AuthResponse> {
    let user;
    const { error: findError, data: findUser } = await this._user.findOneRecord(
      new Job({
        options: {
          where: { apple_id: appleId },
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
            provider: 'Apple',
            apple_id: appleId,
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
    user.apple_id = appleId;
    user.last_login_at = Date.now();
    await user.save();
    return { error: false, user };
  }
}
