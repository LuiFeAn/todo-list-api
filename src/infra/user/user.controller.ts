import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUserInputDto,
  RegisterUserUseCase,
} from 'src/use-cases/user/register-user.use-case';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  async create(@Body() dto: RegisterUserInputDto) {
    await this.registerUser.execute(dto);
  }
}
