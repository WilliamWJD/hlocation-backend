import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateTenentService from './CreateTenent';
import FakeTenentRepository from '../repositories/fakes/FakeTenentRepository';

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

  it('should not be able to create a user with cpf registered', async () => {
    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createTenentService.execute({
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

    await expect(
      createTenentService.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an tanent with rg duplicated', async () => {
    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createTenentService.execute({
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

    await expect(
      createTenentService.execute({
        name: 'Tenant2',
        email: 'tenant2@email.com.br',
        cpf: '1234561',
        rg: '123456',
        genre: 'M',
        marital_status: 'Casado',
        phone1: '123456',
        phone2: '123456',
        profession: 'dev',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
