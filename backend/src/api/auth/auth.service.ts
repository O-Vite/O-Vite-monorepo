import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TId } from 'packages/robusto-crud/base-entity';

export type TSignUpResponse = {
  idUser: TId;
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async register(user: LoginDto): Promise<TSignUpResponse> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    const payload = { id: newUser.id, email: user.email };
    return {
      sub: newUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateCredentialsUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect login information');
      }
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
