import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJwt,
      ]),
      secretOrKey: configService.get('jwt.refreshTokenSecret', { infer: true }),
      passReqToCallback: true,
    });
  }

  private static extractJwt(req: Request): string | null {
    if (req.cookies['refresh_token']) {
      return req.cookies.refresh_token;
    }
    return null;
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
