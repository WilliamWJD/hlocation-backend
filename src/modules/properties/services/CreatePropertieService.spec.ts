import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakePropertieRepository from '../repositories/fakes/FakePropertieRepository';
import CreatePropertieService from './CreatePropertieService';

let createPropertieService: CreatePropertieService;
let fakePropertieRepository: FakePropertieRepository;

let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUserReposigory: FakeUserRepository;

describe('CreatePropertie', () => {
  beforeEach(() => {
    fakeUserReposigory = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserReposigory,
      fakeHashProvider,
    );

    fakePropertieRepository = new FakePropertieRepository();

    createPropertieService = new CreatePropertieService(
      fakePropertieRepository,
      fakeUserReposigory,
    );
  });

  it('should be able to create a new propertie', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    expect(propertie).toHaveProperty('id');
  });

  it('should not be able to create a new propertie with user inexisting', async () => {
    await expect(
      createPropertieService.execute({
        title: 'propertie1',
        description: 'lorem ipsun sit dolor',
        number: 500,
        rent_money: 550,
        user_id: 'user-not-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a propertie with title duplicated', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    await expect(
      createPropertieService.execute({
        title: 'propertie1',
        description: 'lorem ipsun sit dolor',
        number: 500,
        rent_money: 550,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
