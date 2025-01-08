import { PublicRoute } from '@infra/@shared/nestjs/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthenticationInputDto } from 'src/use-cases/auth/user-authentication.dto';
import { UserAuthenticationUseCase } from 'src/use-cases/auth/user-authentication.use-case';
import { AuthPresenter } from './auth.presenter';
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly userAuth: UserAuthenticationUseCase) {}

  @Post('/login')
  @PublicRoute()
  async auth(@Body() dto: UserAuthenticationInputDto) {
    const result = await this.userAuth.execute(dto);
    return {
      user: AuthPresenter.toJson(result.user),
      accessToken: result.accessToken,
    };
  }
}
