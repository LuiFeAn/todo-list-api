import { EmailAlreadyExistsError } from '@domain/@shared/errors/user/email-already-exists.error';
import { PublicRoute } from '@infra/@shared/nestjs/decorators';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { RegisterUserInputDto } from 'src/use-cases/user/register-user.dto';
import { RegisterUserUseCase } from 'src/use-cases/user/register-user.use-case';
import { RegisterUserHttpInput } from './register-user.swagger';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  @ApiBody({
    type: RegisterUserHttpInput,
  })
  @ApiCreatedResponse({
    description: 'Usuário Registrado',
  })
  @ApiConflictResponse({
    description: 'E-mail já registrado',
  })
  @ApiBadRequestResponse({
    description: 'Erro de validação no Body',
  })
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
