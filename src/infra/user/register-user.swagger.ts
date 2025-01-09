import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserHttpInput {
  @ApiProperty({
    description: 'Nome de usuário escolhido pelo cliente.',
    example: 'Luis Fernando',
  })
  username: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário.',
    example: 'luisfernandogvzv@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha forte escolhida pelo usuário.',
    example: 'Str0ngP4ssw0rd12@',
  })
  password: string;
}
