import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserAuthenticationInputDto } from 'src/use-cases/auth/user-authentication.dto';
import { UserAuthenticationUseCase } from 'src/use-cases/auth/user-authentication.use-case';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly userAuth: UserAuthenticationUseCase) {}

  @Post('/login')
  async auth(@Body() dto: UserAuthenticationInputDto) {
    try {
      return await this.userAuth.execute(dto);
    } catch (err) {
      if (err instanceof NotFoundDomainError) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
