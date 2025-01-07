import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { UserMapper } from '@domain/user/user.mapper';
import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtPort from '@infra/jwt/jwt.port';
import { IBaseUseCase } from '@shared/base-use-case.interface';
import {
  UserAuthenticationInputDto,
  UserAuthenticationOutputDto,
} from './user-authentication.dto';
import { envs } from '@infra/@shared/envs';

export class UserAuthenticationUseCase
  implements
    IBaseUseCase<UserAuthenticationInputDto, UserAuthenticationOutputDto>
{
  constructor(
    private readonly userRepo: UserGateway,
    private readonly jwtAdapter: JwtPort,
  ) {}

  async execute({
    email,
    password,
  }: UserAuthenticationInputDto): Promise<UserAuthenticationOutputDto> {
    const user = await this.userRepo.findByEmailEntity(email);

    if (!user) {
      throw new NotFoundDomainError('E-mail ou senha incorreto(s)!');
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw new NotFoundDomainError('E-mail ou senha incorreto(s)!');
    }

    const accessToken = this.jwtAdapter.sign(
      {
        id: user.id,
      },
      envs.JWT_SECRET,
    );

    return {
      user: UserMapper.toObjectLiterals(user),
      accessToken,
    };
  }
}
