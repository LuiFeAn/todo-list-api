import { UserModel } from '@infra/user/user.model';
import { User } from './user.domain';
import { UserFactory } from './user.factory';

export class UserMapper {
  public static domainToTypeOrm(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  public static typeOrmToDomain(user: UserModel) {
    return UserFactory.create(user);
  }

  public static toOutput(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    };
  }
}
