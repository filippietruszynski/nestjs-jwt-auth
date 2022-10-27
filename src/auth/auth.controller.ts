import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  // TODO: get rid of any
  getMe(@Request() req: any) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  // TODO: get rid of any
  async sign(@Request() req: any) {
    return this.authService.signin(req.user);
  }
}
