import { randomUUID } from 'crypto';
import { User } from './user.domain';

describe('User Entity Unit Tests with Custom Strong Password Rules', () => {
  it('should create a user successfully with a valid strong password', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    const user = new User(input);

    expect(user.id).toBe(input.id);
    expect(user.email).toBe(input.email);
    expect(user.username).toBe(input.username);
    expect(user.password).toBe(input.password);
    expect(user.createdAt).toBe(input.createdAt);
  });

  it('should throw an error if the password does not meet the minimum length', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'Short1!',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow(
      '_password is not strong enough',
    );
  });

  it('should throw an error if the password does not contain at least one number', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'NoNumber!',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow(
      '_password is not strong enough',
    );
  });

  it('should throw an error if the password does not contain at least one symbol', () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'NoSymbol1',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow(
      '_password is not strong enough',
    );
  });

  it('should hash the password successfully', async () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    const user = new User(input);
    await user.hashPassword();

    expect(user.password).not.toBe(input.password);
    expect(user.password).toMatch(/^\$2[aby]?\$.{56}$/);
  });

  it('should compare passwords successfully', async () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    const user = new User(input);
    await user.hashPassword();

    const isMatch = await user.comparePassword('ValidPass1!');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword('WrongPass1!');
    expect(isNotMatch).toBe(false);
  });

  it('should maintain idempotency for password comparison after hashing', async () => {
    const input = {
      id: randomUUID(),
      email: 'test@example.com',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    const user = new User(input);
    await user.hashPassword();

    const firstCheck = await user.comparePassword('ValidPass1!');
    const secondCheck = await user.comparePassword('ValidPass1!');

    expect(firstCheck).toBe(true);
    expect(secondCheck).toBe(true);
  });

  it('should throw an error if the email is invalid', () => {
    const input = {
      id: randomUUID(),
      email: 'invalid-email',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_email must be an email');
  });

  it('should throw an error if the email is empty', () => {
    const input = {
      id: randomUUID(),
      email: '',
      username: 'Luis Fernando',
      password: 'ValidPass1!',
      createdAt: new Date().toISOString(),
    };

    expect(() => new User(input)).toThrow('_email should not be empty');
  });
});
