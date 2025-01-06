import { randomUUID } from 'crypto';
import { User } from './user.domain';
import { ICreateUserFactoryProps } from './user.factory.interface';

export class UserFactory {
  public static create({ email, password, username }: ICreateUserFactoryProps) {
    return new User({
      id: randomUUID(),
      email,
      password,
      username,
      createdAt: new Date().toISOString(),
    });
  }
}
