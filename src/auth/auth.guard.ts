import {
  // ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }
  // handleRequest(err, user, info, context: ExecutionContext) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   // Save user in request object for further use
  //   const request = context.switchToHttp().getRequest();
  //   request.user = user;
  //   return user;
  // }
}
