import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreatePropertieService from './CreatePropertieService';
import FakePropertieRepository from '../repositories/fakes/FakePropertieRepository';
import UpdatePropertieService from './UpdatePropertieService';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let hashProvider: FakeHashProvider;

let createPropertieService: CreatePropertieService;
let fakePropertieRepository: FakePropertieRepository;
let updatePropertieService: UpdatePropertieService;

describe('Update propertie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUserRepository, hashProvider);

    fakePropertieRepository = new FakePropertieRepository();
    createPropertieService = new CreatePropertieService(
      fakePropertieRepository,
      fakeUserRepository,
    );

    updatePropertieService = new UpdatePropertieService(
      fakePropertieRepository,
      fakeUserRepository,
    );
  });

  it('should be able to update a propertie', async () => {
    const user = await createUserService.execute({
      name: 'fualno',
      email: 'fulano@email.com.br',
      password: '123',
    });

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    const updatePropertie = await updatePropertieService.execute({
      id: propertie.id,
      title: 'propertie2',
      description: 'lorem ipsun sit dolor',
      number: 600,
      rent_money: 550,
      user_id: user.id,
    });

    expect(updatePropertie.title).toBe('propertie2');
    expect(updatePropertie.number).toBe(600);
  });

  it('should not be able to update a propertie inexisting', async () => {
    const user = await createUserService.execute({
      name: 'fualno',
      email: 'fulano@email.com.br',
      password: '123',
    });

    await expect(
      updatePropertieService.execute({
        id: 'propertie-inexisting',
        title: 'propertie2',
        description: 'lorem ipsun sit dolor',
        number: 600,
        rent_money: 550,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a propertie with an user not registered', async () => {
    const user = await createUserService.execute({
      name: 'fualno',
      email: 'fulano@email.com.br',
      password: '123',
    });

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    await expect(
      updatePropertieService.execute({
        id: propertie.id,
        title: 'propertie2',
        description: 'lorem ipsun sit dolor',
        number: 600,
        rent_money: 550,
        user_id: 'user-not-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
