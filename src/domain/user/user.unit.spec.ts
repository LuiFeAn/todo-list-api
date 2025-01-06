import { randomUUID } from 'crypto';
import { User } from './user.domain';
import { UserMapper } from './user.mapper';

describe('UserEntity Unit Tests', () => {
  it('should create a user successfully', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    const user = UserMapper.toOutput(new User(input));

    expect(input).toEqual(user);
    expect(user).toBeTruthy();
  });

  it('should throw an error if the UUID is empty', () => {
    const input = {
      id: '',
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_id should not be empty');
  });

  it('should throw an error if the UUID is invalid', () => {
    const input = {
      id: '12345',
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_id must be a UUID');
  });

  it('should throw an error if the username is empty', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: '',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_username should not be empty');
  });

  it('should throw an error if the username exceeds 250 characters', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis'.repeat(250),
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow(
      '_username must be shorter than or equal to 250 characters',
    );
  });

  it('should throw an error if the password is empty', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: '',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_password should not be empty');
  });

  it('should throw an error if the email is invalid', () => {
    const input = {
      id: randomUUID(),
      email: 'testemail.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_email must be an email');
  });

  it('should throw an error if the email is empty', () => {
    const input = {
      id: randomUUID(),
      email: '',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow(
      '_email should not be empty,_email must be an email',
    );
  });

  it('should throw an error if the email format is invalid', () => {
    const input = {
      id: randomUUID(),
      email: 'testemail.com',
      username: 'Luis Fernando',
      password: '12345',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_email must be an email');
  });
});
