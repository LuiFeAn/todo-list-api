import { IUser } from '@domain/user/user.interface';

export class AuthPresenter {
  public static toJson(user: IUser) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
