import { EmailAlreadyExistsError } from '@domain/errors/user/email-already-exists.error';
import { UserFactory } from '@domain/user/user.factory';
import { IUserConstructorProps } from '@domain/user/user.interface';
import { UserMapper } from '@domain/user/user.mapper';
import { UserGateway } from '@domain/user/user.repository.gateway';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IBaseUseCase } from 'src/@shared/base-use-case.interface';

export class RegisterUserUseCase
  implements IBaseUseCase<RegisterUserInputDto, IUserConstructorProps>
{
  constructor(private readonly userRepo: UserGateway) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUserInputDto): Promise<IUserConstructorProps> {
    const emailAlreadyExists = await this.userRepo.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError('E-mail já registrado');
    }

    const user = UserFactory.create({
      email,
      password,
      username,
    });

    await user.hashPassword();

    await this.userRepo.create(user);

    return UserMapper.toOutput(user);
  }
}

export class RegisterUserInputDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 0,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
