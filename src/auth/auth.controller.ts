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
import { AuthGuard } from './auth.guard';
import { IUser } from './jwt-strategy';

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
    const user = req.user as IUser;
    console.log(user.id);
    return await this.authService.profile(user.id);
  }
}
