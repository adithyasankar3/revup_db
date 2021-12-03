import { Injectable } from '@nestjs/common';
import { compareHash } from '../../../core/utils/helpers';
import { Job } from '../../../core/utils/job';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

export interface AuthResponse {
  error?: any;
  user?: User;
}

@Injectable()
export class LocalAuthService {
  constructor(private _user: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const { error, data } = await this._user.findOneRecord(
      new Job({
        options: {
          attributes: { include: ['password'] },
          where: { email: username },
          allowEmpty: true,
        },
      }),
    );
    if (!!error) {
      return { error };
    } else if (!!data) {
      if (!(await compareHash(password, data.password))) {
        return { error: 'Invalid credentials' };
      }
      if (!data.active) {
        return { error: 'Account is inactive' };
      }
      data.last_login_at = Date.now();
      await data.save();
      const user = data.toJSON();
      delete user.password;
      return { error: false, user };
    } else {
      return { error: 'Invalid credentials' };
    }
  }
}
