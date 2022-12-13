import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { IsNull, Not } from 'typeorm';
import { JwtPayload, Tokens } from './types/auth.types';

@Injectable()
export class AuthService {
  private configService: ConfigService<Config>;
  private jwtService: JwtService;
  private usersService: UsersService;

  constructor(
    configService: ConfigService<Config>,
    jwtService: JwtService,
    usersService: UsersService,
  ) {
    this.configService = configService;
    this.jwtService = jwtService;
    this.usersService = usersService;
  }

  async signupLocal(
    email: string,
    password: string,
  ): Promise<{ tokens: Tokens; email: string }> {
    const hashedPassword = await this.hashData(password);
    const user = await this.usersService.create(email, hashedPassword);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateHashedRefreshToken(user.id, tokens.refresh_token);

    return { tokens, email: user.email };
  }

  async signinLocal(
    email: string,
    password: string,
  ): Promise<{ tokens: Tokens; email: string }> {
    const user = await this.usersService.findOne({ email });

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new ForbiddenException('access denied');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateHashedRefreshToken(user.id, tokens.refresh_token);

    return { tokens, email: user.email };
  }

  async signout(userId: number): Promise<void> {
    await this.usersService.update(
      userId,
      { hashedRefreshToken: null },
      { hashedRefreshToken: Not(IsNull()) },
    );
  }

  me(userId: number): Promise<{ email: string }> {
    return this.usersService.findOne({ id: userId });
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findOne({ id: userId });

    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('access denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateHashedRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateHashedRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, { hashedRefreshToken });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = { sub: userId, email: email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt.accessTokenSecret', {
          infer: true,
        }),
        expiresIn: this.configService.get('jwt.accessTokenExpirationTime', {
          infer: true,
        }),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt.refreshTokenSecret', {
          infer: true,
        }),
        expiresIn: this.configService.get('jwt.refreshTokenExpirationTime', {
          infer: true,
        }),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
