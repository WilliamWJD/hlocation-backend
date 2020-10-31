import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeTenentRepository from '../repositories/fakes/FakeTenentRepository';
import CreateTenentService from './CreateTenent';
import UpdateTenentService from './UpdateTenentService';

let updateTenentService: UpdateTenentService;
let fakeTenentRepository: FakeTenentRepository;

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createTanentService: CreateTenentService;

describe('UpdateTanent', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeTenentRepository = new FakeTenentRepository();

    createTanentService = new CreateTenentService(fakeTenentRepository);

    updateTenentService = new UpdateTenentService(
      fakeUserRepository,
      fakeTenentRepository,
    );
  });

  it('should be able to update a tanent', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tanent = await createTanentService.execute({
      name: 'Tenant',
      email: 'tenant@email.com.br',
      cpf: '123456',
      rg: '123456',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    const updateTanent = await updateTenentService.execute({
      name: 'Tanent2',
      email: 'tanent2@email.com.br',
      cpf: '11111',
      rg: '999999',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
      id: tanent.id,
    });

    expect(updateTanent.name).toEqual('Tanent2');
    expect(updateTanent.email).toEqual('tanent2@email.com.br');
  });
});
