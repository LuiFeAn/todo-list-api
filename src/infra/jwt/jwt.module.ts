import { Global, Module } from '@nestjs/common';
import JwtPort from './jwt.port';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '@infra/@shared/envs';
import { JwtAdapter } from './jwt.adapter';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.JWT_SECRET,
    }),
  ],
  providers: [
    {
      provide: JwtPort,
      useClass: JwtAdapter,
    },
  ],
  exports: [JwtPort],
})
export class JwtVectorModule {}
