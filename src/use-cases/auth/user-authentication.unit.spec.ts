import { UserAuthenticationUseCase } from './user-authentication.use-case';
import { UserGateway } from '@domain/user/user.repository.gateway';
import JwtPort from '@infra/jwt/jwt.port';
import { NotFoundDomainError } from '@domain/errors/not-found/not-found.errors';
import { UserFactory } from '@domain/user/user.factory';
import { UserAuthenticationInputDto } from './user-authentication.dto';
import { envs } from '@infra/@shared/envs';

describe('UserAuthenticationUseCase', () => {
  let userRepo: jest.Mocked<UserGateway>;
  let jwtAdapter: jest.Mocked<JwtPort>;
  let useCase: UserAuthenticationUseCase;

  beforeEach(() => {
    userRepo = {
      findByEmailEntity: jest.fn(),
    } as unknown as jest.Mocked<UserGateway>;

    jwtAdapter = {
      sign: jest.fn(),
    } as unknown as jest.Mocked<JwtPort>;

    useCase = new UserAuthenticationUseCase(userRepo, jwtAdapter);
  });

  it('should authenticate a user successfully', async () => {
    const mockUser = UserFactory.create({
      email: 'test@example.com',
      password: 'ValidPassword123!',
      username: 'Luis Fernando',
    });

    jest.spyOn(mockUser, 'comparePassword').mockResolvedValue(true);

    const mockAccessToken = 'mock-token';

    userRepo.findByEmailEntity.mockResolvedValue(mockUser);
    jwtAdapter.sign.mockReturnValue(mockAccessToken);

    const input = {
      email: mockUser.email,
      password: 'ValidPassword123!',
    };

    const result = await useCase.execute(
      new UserAuthenticationInputDto(input.email, input.password),
    );

    expect(userRepo.findByEmailEntity).toHaveBeenCalledWith(input.email);
    expect(mockUser.comparePassword).toHaveBeenCalledWith(input.password);
    expect(jwtAdapter.sign).toHaveBeenCalledWith(
      { id: mockUser.id },
      envs.JWT_SECRET,
    );

    expect(result).toEqual({
      user: expect.any(Object),
      accessToken: mockAccessToken,
    });
  });

  it('should throw NotFoundDomainError if user does not exist', async () => {
    userRepo.findByEmailEntity.mockResolvedValue(null);

    const input = {
      email: 'nonexistent@example.com',
      password: 'InvalidPassword!',
    };

    await expect(
      useCase.execute(
        new UserAuthenticationInputDto(input.email, input.password),
      ),
    ).rejects.toThrow(new NotFoundDomainError('E-mail ou senha incorreto(s)!'));

    expect(userRepo.findByEmailEntity).toHaveBeenCalledWith(input.email);
    expect(jwtAdapter.sign).not.toHaveBeenCalled();
  });

  it('should throw NotFoundDomainError if password is incorrect', async () => {
    const mockUser = UserFactory.create({
      email: 'test@example.com',
      password: 'ValidPassword123!',
      username: 'Luis Fernando',
    });

    jest.spyOn(mockUser, 'comparePassword').mockResolvedValue(false);

    userRepo.findByEmailEntity.mockResolvedValue(mockUser);

    const input = {
      email: mockUser.email,
      password: 'InvalidPassword!',
    };

    await expect(
      useCase.execute(
        new UserAuthenticationInputDto(input.email, input.password),
      ),
    ).rejects.toThrow(new NotFoundDomainError('E-mail ou senha incorreto(s)!'));

    expect(userRepo.findByEmailEntity).toHaveBeenCalledWith(input.email);
    expect(mockUser.comparePassword).toHaveBeenCalledWith(input.password);
    expect(jwtAdapter.sign).not.toHaveBeenCalled();
  });
});
