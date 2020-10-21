// import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatarService: UpdateUserAvatarService;
let createUserService: CreateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the avatar on a user', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update the avatar of an unauthenticated user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'user_not_existing',
        avatar: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating a new user', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar: 'avatar2.jpg',
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
