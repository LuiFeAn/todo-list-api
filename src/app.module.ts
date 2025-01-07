import { AuthModule } from '@infra/auth/auth.module';
import { JwtVectorModule } from '@infra/jwt/jwt.module';
import { UserModel } from '@infra/user/user.model';
import { UserModule } from '@infra/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NotFoundDomainErrorProxyFilter } from '@infra/@shared/nestjs/filters/not-found-domain-proxy.filter';
import { AuthorizationGuard } from '@infra/@shared/nestjs/guards/auth.guard';
import { TodoListModel } from '@infra/todo/todo.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get<string>('DB_NAME'),
        host: configService.get<string>('DB_HOST'),
        username: configService.get<string>('DB_USER'),
        port: configService.get<number>('DB_PORT'),
        password: configService.get<string>('DB_PASS'),
        entities: [UserModel, TodoListModel],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    JwtVectorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundDomainErrorProxyFilter,
    },
  ],
})
export class AppModule {}
