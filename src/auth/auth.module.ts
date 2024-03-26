import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt-strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwt_config.secret,
      signOptions: {
        expiresIn: jwt_config.expired,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
