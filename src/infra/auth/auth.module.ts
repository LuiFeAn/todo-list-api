import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtPort from '@infra/jwt/jwt.port';
import { UserModule } from '@infra/user/user.module';
import { Module } from '@nestjs/common';
import { UserAuthenticationUseCase } from 'src/use-cases/auth/user-authentication.use-case';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: UserAuthenticationUseCase,
      useFactory: (userGateway, JwtPort: JwtPort) =>
        new UserAuthenticationUseCase(userGateway, JwtPort),
      inject: [UserGateway, JwtPort],
    },
  ],
})
export class AuthModule {}
