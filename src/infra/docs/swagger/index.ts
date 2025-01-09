import { DocumentBuilder } from '@nestjs/swagger';

export default function swaggerDocs() {
  const config = new DocumentBuilder()
    .setTitle('Todo-List')
    .setDescription('Documentação da API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  return config;
}
