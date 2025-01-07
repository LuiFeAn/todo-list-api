import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import JwtPort, { JwtPayload } from './jwt.port';

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: string | Buffer | object, secret: string): string {
    return this.jwtService.sign(payload as string, { secret });
  }

  verify(token: string, secret: string): JwtPayload | unknown {
    return this.jwtService.verify(token, { secret });
  }
}
