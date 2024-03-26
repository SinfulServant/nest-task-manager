import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { IUser } from 'src/interfaces/user.interface';

@ApiTags('Users manage')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Res() res: Response, @Body() data: LoginDto) {
    const cookie = await this.authService.login(data);
    res.setHeader('Set-Cookie', cookie);
    return res.sendStatus(200);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req: Request & { user?: IUser }) {
    const user = req.user;
    console.log(user.id);
    return await this.authService.profile(user.id);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signInByGoogle(req.user);
    if (token) res.setHeader('Set-Cookie', token);
    return res.sendStatus(200);
  }

  @Get('google-successfully')
  googleSuccessfully() {
    return 'Hello google';
  }
}
