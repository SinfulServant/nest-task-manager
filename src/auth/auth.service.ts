import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { jwt_config } from 'src/config/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    console.log(checkUserExists);
    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    data.password = await hash(data.password, 12);
    const createUser = await this.prisma.user.create({
      data: data,
    });
    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register Successfull',
      };
    }
  }

  async login(data: LoginDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(
      data.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      return this.generateJWT({
        id: checkUserExists.id,
        name: checkUserExists.name,
        email: checkUserExists.email,
      });
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateJWT(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
    return `Authentication=${accessToken}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${jwt_config.expired}`;
  }

  async profile(userId: number) {
    console.log(userId);
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async signInByGoogle(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerByGoogle(user);
    }
    console.log('login by google! User - ', userExists);

    return this.generateJWT({
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    });
  }

  async registerByGoogle(user) {
    try {
      console.log('registred by google!');
      const newUser = await this.prisma.user.create({
        data: { email: user.email, name: user.email },
      });

      return this.generateJWT({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
