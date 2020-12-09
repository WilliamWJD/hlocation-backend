import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListPropertieService from './ListPropertieService';
import FakePropertieRepository from '../repositories/fakes/FakePropertieRepository';
import CreatePropertieService from './CreatePropertieService';

let listPropertieService: ListPropertieService;
let fakePropertiesRepository: FakePropertieRepository;

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

let hashProvider: FakeHashProvider;

let createPropertieService: CreatePropertieService;

describe('List properties by user', () => {
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

  it('should be able to list all properties the user', async () => {
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

    const propertie2 = await createPropertieService.execute({
      title: 'propertie teste 2',
      description: 'teste 2',
      number: 500,
      rent_money: 1250,
      user_id: user.id,
    });

    const propertiesByUser = await listPropertieService.execute({
      user_id: user.id,
    });

    expect(propertiesByUser).toEqual([propertie1, propertie2]);
  });
});
