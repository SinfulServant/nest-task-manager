import { Injectable } from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {}

