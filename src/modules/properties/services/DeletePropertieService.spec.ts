import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListPropertieService from './ListPropertieService';
import FakePropertieRepository from '../repositories/fakes/FakePropertieRepository';
import CreatePropertieService from './CreatePropertieService';
import DeletePropertieSevice from './DeletePropertieService';

let fakePropertiesRepository: FakePropertieRepository;
let createPropertieService: CreatePropertieService;
let listPropertieService: ListPropertieService;
let deletePropertieService: DeletePropertieSevice;

let fakeUserRepository: FakeUserRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Delete propertie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    fakePropertiesRepository = new FakePropertieRepository();

    createUserService = new CreateUserService(fakeUserRepository, hashProvider);

    createPropertieService = new CreatePropertieService(
      fakePropertiesRepository,
      fakeUserRepository,
    );

    listPropertieService = new ListPropertieService(
      fakePropertiesRepository,
      fakeUserRepository,
    );

    deletePropertieService = new DeletePropertieSevice(
      fakePropertiesRepository,
      fakeUserRepository,
    );
  });

  it('should be able to delete propertie', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const propertie1 = await createPropertieService.execute({
      title: 'propertie teste',
      description: 'teste',
      number: 500,
      rent_money: 1250,
      user_id: user.id,
    });

    await createPropertieService.execute({
      title: 'propertie teste 2',
      description: 'teste 2',
      number: 500,
      rent_money: 1250,
      user_id: user.id,
    });

    await deletePropertieService.execute({
      id: propertie1.id,
      user_id: user.id,
    });

    const propertiesByUser = await listPropertieService.execute({
      user_id: user.id,
    });

    expect(propertiesByUser).not.toContain(propertie1);
  });

  it('should not be able to delete a propertie whith an user not registered', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    const propertie1 = await createPropertieService.execute({
      title: 'propertie teste',
      description: 'teste',
      number: 500,
      rent_money: 1250,
      user_id: user.id,
    });

    await expect(
      deletePropertieService.execute({
        id: propertie1.id,
        user_id: 'user-not-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a propertie inexisting', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@fulano.com.br',
      password: '123456',
    });

    await expect(
      deletePropertieService.execute({
        id: 'propertie-inexisting',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
