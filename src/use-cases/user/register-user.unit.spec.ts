import { EmailAlreadyExistsError } from '@domain/errors/user/email-already-exists.error';
import { UserFactory } from '@domain/user/user.factory';
import { AbstractUserRepository } from '@domain/user/user.repository.gateway';
import {
  RegisterUserUseCase,
  RegisterUserInputDto,
} from './register-user.use-case';

describe('RegisterUserUseCase Unit Tests', () => {
  let userRepoMock: jest.Mocked<AbstractUserRepository>;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    userRepoMock = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<AbstractUserRepository>;

    useCase = new RegisterUserUseCase(userRepoMock);
  });
  it('should register a user successfully', async () => {
    const input: RegisterUserInputDto = {
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'StrongPass1!',
    };

    userRepoMock.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute(input);

    expect(userRepoMock.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepoMock.create).toHaveBeenCalled();
    expect(result).toEqual({
      id: expect.any(String),
      username: input.username,
      email: input.email,
      password: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('should throw an error if the email is already registered', async () => {
    const input: RegisterUserInputDto = {
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'StrongPass1!',
    };

    userRepoMock.findByEmail.mockResolvedValue(true);

    await expect(useCase.execute(input)).rejects.toThrow(
      EmailAlreadyExistsError,
    );
    expect(userRepoMock.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepoMock.create).not.toHaveBeenCalled();
  });

  it('should hash the password before saving', async () => {
    const input: RegisterUserInputDto = {
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'StrongPass1!',
    };

    userRepoMock.findByEmail.mockResolvedValue(null);

    await useCase.execute(input);

    expect(userRepoMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        password: expect.stringMatching(/^\$2[aby]\$.{56}$/),
      }),
    );
  });
});
