import { UserModel } from '@infra/user/user.model';
import { User } from './user.domain';
import { UserFactory } from './user.factory';

export class UserMapper {
  public static domainToTypeOrm(user: User) {
    return this.toObjectLiterals(user);
  }

  public static typeOrmToDomain(user: UserModel) {
    return UserFactory.create({
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
    });
  }

  public static toObjectLiterals(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    };
  }
}
