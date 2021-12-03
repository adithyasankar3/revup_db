import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as moment from 'moment-timezone';
import { CachingService } from '../../core/modules/caching/caching.service';
import { Job, JobResponse } from '../../core/utils/job';
import { User } from '../user/entities/user.entity';
import { OwnerDto } from '../../decorators/owner.decorator';
import { LoginLogService } from '../login-log/login-log.service';
import { LoginLog } from '../login-log/entities/login-log.schema';
import { TokenAuthDto } from './token/token-auth.dto';
import { UserService } from '../user/user.service';
import { OtpSessionService } from '../otp-session/otp-session.service';
import { generateHash, otp, uuid } from '../../core/utils/helpers';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { MsClientService } from '../../core/modules/ms-client/ms-client.service';
import { ConfigService } from '@nestjs/config';

export interface AuthResponse {
  error?: any;
  user?: User;
}

@Injectable()
export class AuthService {
  constructor(
    private _jwt: JwtService,
    private _cache: CachingService,
    private userService: UserService,
    private loginLogService: LoginLogService,
    private otpSessionService: OtpSessionService,
    private msClient: MsClientService,
    private config: ConfigService,
  ) {}

  async createSession(owner: OwnerDto, info: any): Promise<any> {
    try {
      const refreshToken = randomBytes(40).toString('hex');
      const { error, data } = await this.loginLogService.create(
        new Job({
          action: 'create',
          owner,
          body: {
            token: refreshToken,
            user_id: owner.id,
            info,
          },
        }),
      );
      if (!!error) return { error };
      const token = this._jwt.sign({
        sessionId: data._id,
        userId: owner.id,
      });
      const tokenExpiry = moment().add(
        this.config.get('jwt')?.signOptions?.expiresIn,
        'seconds',
      );
      return {
        error: false,
        data: {
          token,
          token_expiry: tokenExpiry,
          refresh_token: refreshToken,
          user: owner,
          session_id: data._id,
        },
      };
    } catch (error) {
      return { error };
    }
  }

  async createUserSession(userId: number): Promise<any> {
    try {
      const { error, data } = await this.userService.findOneRecord(
        new Job({
          options: {
            where: { id: userId, role_id: 2 },
            allowEmpty: false,
          },
        }),
      );
      if (!!error) {
        return { error: 'Account does not exist' };
      } else {
        if (!data.active) {
          return { error: 'Account is inactive' };
        }
        const token = this._jwt.sign({
          sessionId: uuid(),
          userId,
        });
        const tokenExpiry = moment().add(
          this.config.get('jwt')?.signOptions?.expiresIn,
          'seconds',
        );
        return {
          error: false,
          data: { token, token_expiry: tokenExpiry, user: data },
        };
      }
    } catch (error) {
      return { error };
    }
  }

  async getNewToken(tokens: TokenAuthDto, session: LoginLog): Promise<any> {
    try {
      const decoded: any = await this._jwt.decode(tokens.token);
      if (
        decoded.sessionId !== String(session._id) ||
        decoded.userId !== session.user_id
      ) {
        return { error: 'Invalid token' };
      }
      const token = this._jwt.sign({
        sessionId: session._id,
        userId: session.user_id,
      });
      const tokenExpiry = moment().add(
        this.config.get('jwt')?.signOptions?.expiresIn,
        'seconds',
      );
      return {
        error: false,
        data: { token, token_expiry: tokenExpiry },
      };
    } catch (error) {
      return { error };
    }
  }

  async clearSession(owner: OwnerDto) {
    const { exp, sessionId } = owner;
    await this.loginLogService.update(
      new Job({
        action: 'update',
        id: sessionId,
        body: {
          logout_at: moment().toDate(),
          active: false,
        },
      }),
    );
    const authExp = new Date(exp * 1000);
    authExp.setHours(23, 59, 59, 999);
    const authRedisExpiry = (authExp.getTime() - new Date().getTime()) / 1000;
    const authKey = moment(authExp).format('DDMMYYYY');
    await this._cache.addToBlackList({
      expireAt: Math.floor(authRedisExpiry),
      key: authKey,
      sessionId,
    });
  }

  async verifyEmail(email: string): Promise<JobResponse> {
    const { error, data } = await this.userService.findOneRecord(
      new Job({
        options: {
          where: { email },
          allowEmpty: true,
        },
      }),
    );
    if (!!error) {
      return { error };
    } else if (!!data) {
      if (!data.active) {
        return { error: 'Account is inactive' };
      }
      return { error: false, data };
    } else {
      return { error: 'Invalid email' };
    }
  }

  async forgotOtp(user: User): Promise<JobResponse> {
    const { error, data } = await this.otpSessionService.createRecord(
      new Job({
        body: {
          user_id: user.id,
          otp: otp(),
          type: 'Forgot',
          expire_at: moment().add(15, 'minutes'),
        },
      }),
    );
    await this.msClient.executeJob(
      'controller.notification',
      new Job({
        action: 'send',
        payload: {
          user_id: user.id,
          template: 'forgot_password',
          skipUserConfig: true,
          variables: {
            OTP: data.otp,
          },
        },
      }),
    );
    return { error, data };
  }

  async verifyOtp(body: VerifyOtpDto): Promise<JobResponse> {
    const { error, data } = await this.otpSessionService.findRecordById(
      new Job({
        id: body.session_id,
      }),
    );
    if (!!error) {
      return { error: 'Invalid session' };
    }
    if (!!data.verified || data.otp !== body.otp) {
      return { error: 'Invalid OTP' };
    }
    if (moment(data.expire_at).diff(moment(), 'seconds') <= 0) {
      return { error: 'OTP expired' };
    }
    data.verified = true;
    await data.save();
    return { error: false, data };
  }

  async sendOtp(body: SendOtpDto): Promise<JobResponse> {
    const { error, data } = await this.otpSessionService.findRecordById(
      new Job({
        id: body.session_id,
      }),
    );
    if (!!error || !!data.verified) {
      return { error: 'Invalid session' };
    }
    if (moment(data.expire_at).diff(moment(), 'seconds') <= 0) {
      return { error: 'Session expired' };
    }
    data.expire_at = moment().add(15, 'minutes');
    await data.save();
    await this.msClient.executeJob(
      'controller.notification',
      new Job({
        action: 'send',
        payload: {
          user_id: data.user_id,
          template: 'forgot_password',
          skipUserConfig: true,
          variables: {
            OTP: data.otp,
          },
        },
      }),
    );
    return { error: false, data };
  }

  async resetPassword(body: ResetPasswordDto): Promise<JobResponse> {
    const otpSession = await this.otpSessionService.findRecordById(
      new Job({
        id: body.session_id,
      }),
    );
    if (!!otpSession.error || !otpSession.data.verified) {
      return { error: 'Invalid session' };
    }
    const userUpdate = await this.userService.update(
      new Job({
        id: otpSession.data.user_id,
        body: {
          password: await generateHash(body.password),
        },
      }),
    );
    if (!!userUpdate.error) {
      return { error: 'Unable to change password' };
    }
    await this.otpSessionService.deleteRecord(
      new Job({
        id: body.session_id,
      }),
    );
    return { error: false };
  }
}
