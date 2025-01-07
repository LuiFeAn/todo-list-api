import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { UserGateway } from '@domain/user/user.repository.gateway';
import { RegisterUserUseCase } from 'src/use-cases/user/register-user.use-case';
import { TypeOrmUserRepository } from './typeorm-user-repository';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    {
      provide: UserGateway,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userGateway: UserGateway) =>
        new RegisterUserUseCase(userGateway),
      inject: [UserGateway],
    },
    TypeOrmUserRepository,
  ],
  exports: [RegisterUserUseCase,UserGateway],
})
export class UserModule {}
