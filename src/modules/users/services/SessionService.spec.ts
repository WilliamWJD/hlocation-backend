import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SessionService from './SessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let sessionService: SessionService;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('SessionService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    sessionService = new SessionService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticated a user with email and password', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const response = await sessionService.execute({
      email: 'fulano@email.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticated with an email not registered', async () => {
    await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await expect(
      sessionService.execute({
        email: 'fulano2@email.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a non-matching password', async () => {
    await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await expect(
      sessionService.execute({
        email: 'fulano@email.com.br',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
