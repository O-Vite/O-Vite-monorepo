import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService, TSignUpResponse } from './auth.service';
import { Public } from '../../services/guard/auth/publicAccess.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TypedBody, TypedRoute } from '@nestia/core';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @TypedRoute.Post('login')
  login(@TypedBody() loginObj: LoginDto) {
    return this.authService.signIn(loginObj);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @TypedRoute.Post('register')
  register(@TypedBody() registerObj: RegisterDto): Promise<TSignUpResponse> {
    return this.authService.signUp(registerObj);
  }
}

// export namespace ApiAuth {
//   export const v = 'auth';
//   export namespace ping {
//     export const v = 'ping';
//     export type type = InstanceType<typeof AuthController>['ping'];
//   }
// }
