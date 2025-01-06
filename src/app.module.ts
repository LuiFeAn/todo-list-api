import { UserModel } from '@infra/user/user.model';
import { UserModule } from '@infra/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        entities: [UserModel],
      }),
    }),
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [UserModule],
})
export class AppModule {}
