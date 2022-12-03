import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { RefreshTokenGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/auth/decorators';
import { Tokens } from './types/auth.types';
import { AuthRoute } from 'src/auth/auth.routes';

@Controller(AuthRoute.Auth)
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /* SIGNUP */
  @Public()
  @Post(AuthRoute.LocalSignup)
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(body.email, body.password);
  }

  /* SIGNIN */
  @Public()
  @Post(AuthRoute.LocalSignin)
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(body.email, body.password);
  }

  /* SIGNOUT */
  @Post(AuthRoute.Signout)
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUserId() userId: number) {
    return this.authService.signout(userId);
  }

  /* REFRESH */
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post(AuthRoute.Refresh)
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
