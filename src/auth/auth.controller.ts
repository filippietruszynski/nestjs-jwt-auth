import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { RefreshTokenGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/auth/decorators';
import { AuthRoute } from 'src/auth/auth.routes';
import { Response } from 'express';

@Controller(AuthRoute.AUTH)
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /* LOCAL SIGNUP */
  @Public()
  @Post(AuthRoute.LOCAL_SIGNUP)
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, email } = await this.authService.signupLocal(
      body.email,
      body.password,
    );

    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token, email };
  }

  /* LOCAL SIGNIN */
  @Public()
  @Post(AuthRoute.LOCAL_SIGNIN)
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, email } = await this.authService.signinLocal(
      body.email,
      body.password,
    );

    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token, email };
  }

  /* SIGNOUT */
  @Post(AuthRoute.SIGNOUT)
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUserId() userId: number) {
    return this.authService.signout(userId);
  }

  /* ME */
  @Get(AuthRoute.ME)
  @HttpCode(HttpStatus.OK)
  me(@GetCurrentUserId() userId: number) {
    return this.authService.me(userId);
  }

  /* REFRESH TOKENS */
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post(AuthRoute.REFRESH_TOKENS)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshedTokens = await this.authService.refreshTokens(
      userId,
      refreshToken,
    );

    res.cookie('refresh_token', refreshedTokens.refresh_token, {
      httpOnly: true,
    });
    return { access_token: refreshedTokens.access_token };
  }
}
