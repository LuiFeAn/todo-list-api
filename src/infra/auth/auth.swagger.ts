import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class AuthHttpInput {
  @ApiProperty({
    description: 'E-mail do Usuário',
    example: 'fulanodetal@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do Usuário',
    example: 'senhaForte123',
  })
  password: string;
}

export class AuthSessionHttpOutput {
  @ApiProperty({
    description: 'Id do Usuário',
    example: randomUUID(),
  })
  id: string;

  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'fulanodetal',
  })
  username: string;

  @ApiProperty({
    description: 'E-mail do Usuário',
    example: 'fulanodetal@email.com',
  })
  email: string;
}

export class AuthHttpOutput {
  @ApiProperty({
    description: 'Informações do Usuário',
  })
  user: AuthSessionHttpOutput;

  @ApiProperty({
    description: 'AccessToken do Usuário (Jwt)',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;
}
