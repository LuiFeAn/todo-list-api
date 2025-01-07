import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtPort from '@infra/jwt/jwt-port';
import { UserModule } from '@infra/user/user.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthenticationUseCase } from 'src/use-cases/auth/user-authentication.use-case';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: JwtPort,
      useClass: JwtService,
    },
    {
      provide: UserAuthenticationUseCase,
      useFactory: (userGateway, JwtPort: JwtPort) =>
        new UserAuthenticationUseCase(userGateway, JwtPort),
      inject: [UserGateway, JwtPort],
    },
  ],
})
export class AuthModule {}
