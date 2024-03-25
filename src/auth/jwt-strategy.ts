import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt_config } from 'src/config/jwt';
import { Request } from 'express';

export interface IUser {
  id: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: jwt_config.secret,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }

  private static extractJwt(req: Request): string | null {
    if (
      req.cookies &&
      'Authentication' in req.cookies &&
      req.cookies.Authentication.length > 0
    ) {
      return req.cookies.Authentication;
    }
    return null;
  }
}
