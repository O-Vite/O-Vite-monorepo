import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
// import { AuthService, TSignUpResponse } from './auth.service';
import { Public } from '../../services/guard/auth/publicAccess.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { AuthService, TSignUpResponse } from './auth.service';
import { UserEntity } from 'src/services/database/entities/user.entity';

export type LoginDto = Pick<UserEntity, 'email' | 'password'>;
export type RegisterDto = Pick<UserEntity, 'email' | 'password'>;

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
