import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateTenentService from './CreateTenent';
import FakeTenentRepository from '../repositories/fakes/FakeTenentRepository';
import Tenent from '../infra/typeorm/entities/Tenents';

let fakeTenentRepository: FakeTenentRepository;
let createTenentService: CreateTenentService;

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateTenant', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeTenentRepository = new FakeTenentRepository();
    createTenentService = new CreateTenentService(fakeTenentRepository);
  });

  it('should be able to create a new tenent', async () => {
    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTenentService.execute({
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

    expect(tenant).toHaveProperty('id');
  });
});
