import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
// import { AuthService, TSignUpResponse } from './auth.service';
import { Public } from '../../services/guard/auth/publicAccess.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { UserDb } from 'src/services/database/entities/user.entity';
import { AuthService, TSignUpResponse } from './auth.service';

export type LoginDto = Pick<UserDb, 'email' | 'password'>;
export type RegisterDto = Pick<
  UserDb,
  'email' | 'password' | 'firstName' | 'lastName' | 'role'
>;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @TypedRoute.Post('login')
  login(@TypedBody() loginObj: LoginDto) {
    return this.authService.signIn(loginObj);
  }
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @TypedRoute.Post('register')
  register(@TypedBody() registerObj: RegisterDto): Promise<TSignUpResponse> {
    return this.authService.register(registerObj);
  }
}
