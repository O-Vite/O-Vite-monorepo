import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TId } from 'packages/robusto-crud/base-entity';
import { LoginDto, RegisterDto } from './auth.controller';
import { Orm } from 'src/services/database/database.service';
import { UserEntity } from 'src/services/database/entities/user.entity';

export type TSignUpResponse = {
  sub: TId;
  access_token: string;
};

@Injectable()
export class AuthService {
  private orm = Orm;
  constructor(private jwtService: JwtService) {}

  async signIn(user: LoginDto): Promise<TSignUpResponse> {
    const validatedUser = await this.validateCredentialsUser(
      user.email,
      user.password,
    );

    if (validatedUser) {
      const payload = { id: validatedUser.id, email: user.email };
      return {
        sub: validatedUser.id,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Les informations de connexion sont incorrectes',
      );
    }
  }

  async register(user: RegisterDto): Promise<TSignUpResponse> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.orm.save(UserEntity, {
      ...user,
      password: hashedPassword,
    });

    console.log('newUser', newUser);

    const payload = { id: newUser.id, email: user.email };
    console.log('payload', payload);
    return {
      sub: newUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateCredentialsUser(email: string, password: string) {
    const user = await this.orm.findOne(UserEntity, {
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect login information');
    } else if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect login information');
      }
    }
    return null;
  }

  // async validateToken(token: string): Promise<any> {
  //   try {
  //     return this.jwtService.verify(token);
  //   } catch (e) {
  //     return null;
  //   }
  // }
}
