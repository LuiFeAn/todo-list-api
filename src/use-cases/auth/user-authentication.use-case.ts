import { EntityErrors } from '@domain/errors/entity-validation/entity-errors.error';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { IUser } from '@domain/user/user.interface';
import { UserMapper } from '@domain/user/user.mapper';
import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtContract from '@infra/jwt/jwt-adapter';
import classValidatorValidation from '@utils/classValidatorValidation';
import { IsEmail, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { IBaseUseCase } from 'src/@shared/base-use-case.interface';

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

export class UserAuthenticationInputDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  validate() {
    const validation = classValidatorValidation(validateSync(this));

    if (validation.errors.length > 0) {
      throw new EntityErrors({
        context: 'UserAuthenticationInput',
        ...validation,
      });
    }
  }
}

export class UserAuthenticationOutputDto {
  user: IUser;
  accessToken: string;
}
