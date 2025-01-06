import { randomUUID } from 'crypto';
import { User } from './user.domain';
import { UserMapper } from './user.mapper';

describe('UserEntity unit tests', () => {
  it('Should create a user', () => {
    const input = {
      id: randomUUID(),
      email: 'teste@email.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    const user = UserMapper.toOutput(new User(input));

    expect(input).toEqual(user);
    expect(user).toBeTruthy();
  });

  it('Should throw an error if the email is invalid', () => {
    const input = {
      id: randomUUID(),
      email: 'testeemail.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_email must be an email');
  });
});
