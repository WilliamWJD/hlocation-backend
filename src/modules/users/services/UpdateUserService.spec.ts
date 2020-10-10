import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserService from './UpdateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let updateUserService: UpdateUserService;
let createUserService: CreateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update an user', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const updateUser = await updateUserService.execute({
      user_id: user.id,
      name: 'fulano2',
      email: 'fulano2@email.com.br',
      password: '123456',
    });

    expect(updateUser.name).toBe('fulano2');
    expect(updateUser.email).toBe('fulano2@email.com.br');
  });

  it('should not be able to update a user not existing', async () => {
    await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        user_id: 'error-id',
        name: 'fulano2',
        email: 'fulano2@fulano.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with an email registered', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await createUserService.execute({
      name: 'fulano',
      email: 'fulano2@fulano.com.br',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'fulano2',
        email: 'fulano2@fulano.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
