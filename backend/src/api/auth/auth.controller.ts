import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { AuthService, TSignUpResponse } from './auth.service';
import { Public } from '../../services/guard/auth/publicAccess.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import {
  AuthService,
  InsertRegisterDto,
  LoginDto,
  TSignUpResponse,
} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() loginObj: LoginDto) {
    return this.authService.signIn(loginObj);
  }
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  register(@Body() registerObj: InsertRegisterDto): Promise<TSignUpResponse> {
    return this.authService.register(registerObj);
  }
}
