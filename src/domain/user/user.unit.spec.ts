import { randomUUID } from 'crypto';
import { User } from './user.domain';

describe('UserEntity unit tests', () => {
  it('Should create a user', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name: 'Luis Fernando',
      email: 'teste@email.com',
      password: '12345',
    });
  });
});
