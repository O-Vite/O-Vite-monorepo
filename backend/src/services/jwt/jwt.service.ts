import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JWT_CONSTANTS } from './jwt.constants';

@Injectable()
export class JwtService {
  generateToken(payload: any): string {
    return sign(payload, JWT_CONSTANTS.secret, {
      expiresIn: JWT_CONSTANTS.expiresIn,
    });
  }

  verifyToken(token: string) {
    return verify(token, JWT_CONSTANTS.secret);
  }
}
