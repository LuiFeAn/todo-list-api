import { EmailAlreadyExistsError } from '@domain/@shared/errors/user/email-already-exists.error';
import { UserFactory } from '@domain/user/user.factory';
import { IUser } from '@domain/user/user.interface';
import { UserMapper } from '@domain/user/user.mapper';
import { UserGateway } from '@domain/user/user.repository.gateway';
import { IBaseUseCase } from 'src/use-cases/@shared/base-use-case.interface';
import { RegisterUserInputDto } from './register-user.dto';

export class RegisterUserUseCase
  implements IBaseUseCase<RegisterUserInputDto, IUser>
{
  constructor(private readonly userRepo: UserGateway) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUserInputDto): Promise<IUser> {
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

    return UserMapper.toObjectLiterals(user);
  }
}
