import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { UserMapper } from '@domain/user/user.mapper';
import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtContract from '@infra/jwt/jwt-adapter';
import { IBaseUseCase } from 'src/@shared/base-use-case.interface';
import {
  UserAuthenticationInputDto,
  UserAuthenticationOutputDto,
} from './user-authentication.dto';

export class UserAuthenticationUseCase
  implements
    IBaseUseCase<UserAuthenticationInputDto, UserAuthenticationOutputDto>
{
  constructor(
    private readonly userRepo: UserGateway,
    private readonly jwtAdapter: JwtContract,
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
      process.env.JWT_SECRET_KEY as string,
    );

    return {
      user: UserMapper.toOutput(user),
      accessToken,
    };
  }
}
