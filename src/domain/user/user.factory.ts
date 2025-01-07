import { randomUUID } from 'crypto';
import { User } from './user.domain';
import { ICreateUserFactoryProps } from './user.factory.interface';

export class UserFactory {
  public static create({
    id,
    email,
    password,
    username,
    createdAt,
  }: ICreateUserFactoryProps) {
    return new User({
      id: id ?? randomUUID(),
      email,
      password,
      username,
      createdAt: createdAt ?? new Date().toISOString(),
    });
  }
}
