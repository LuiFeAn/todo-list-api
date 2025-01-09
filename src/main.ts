import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { envs } from '@infra/@shared/envs';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerDocs from '@infra/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerDocs());
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(envs.API_PORT ?? 3000);
}
bootstrap();
