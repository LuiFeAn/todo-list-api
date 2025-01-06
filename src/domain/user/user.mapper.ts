import { User } from './user.domain';

export class UserMapper {
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
