import { EmailAlreadyExistsError } from '@domain/errors/user/email-already-exists.error';
import { PublicRoute } from '@infra/@shared/nestjs/decorators';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterUserInputDto } from 'src/use-cases/user/register-user.dto';
import { RegisterUserUseCase } from 'src/use-cases/user/register-user.use-case';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  @PublicRoute()
  async create(@Body() dto: RegisterUserInputDto) {
    try {
      await this.registerUser.execute(dto);
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError) {
        throw new ConflictException(err.message);
      }
    }
  }
}
