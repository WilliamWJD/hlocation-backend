import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
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

  it('should not be able to update a tanent with cpf duplicated', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createTanentService.execute({
      name: 'Tenant',
      email: 'tenant@email.com.br',
      cpf: '111111',
      rg: '222222',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    const tanent = await createTanentService.execute({
      name: 'Tenant2',
      email: 'tenant2@email.com.br',
      cpf: '123456',
      rg: '333333',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    await expect(
      updateTenentService.execute({
        name: 'Tenant3',
        email: 'tenant3@email.com.br',
        cpf: '111111',
        rg: '444444',
        genre: 'M',
        marital_status: 'Casado',
        phone1: '123456',
        phone2: '123456',
        profession: 'dev',
        user_id: user.id,
        id: tanent.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a tanent with rg duplicated', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createTanentService.execute({
      name: 'Tenant',
      email: 'tenant@email.com.br',
      cpf: '111111',
      rg: '111111',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    const tanent = await createTanentService.execute({
      name: 'Tenant2',
      email: 'tenant2@email.com.br',
      cpf: '4564564',
      rg: '222222',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    await expect(
      updateTenentService.execute({
        name: 'Tenant3',
        email: 'tenant3@email.com.br',
        cpf: '4564564',
        rg: '111111',
        genre: 'M',
        marital_status: 'Casado',
        phone1: '123456',
        phone2: '123456',
        profession: 'dev',
        user_id: user.id,
        id: tanent.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a tanent with an user not existing', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTanentService.execute({
      name: 'Tenant',
      email: 'tenant@email.com.br',
      cpf: '111111',
      rg: '111111',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    await expect(
      updateTenentService.execute({
        name: 'Tenant3',
        email: 'tenant3@email.com.br',
        cpf: '4564564',
        rg: '111111',
        genre: 'M',
        marital_status: 'Casado',
        phone1: '123456',
        phone2: '123456',
        profession: 'dev',
        user_id: 'user-not-existing',
        id: tenant.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a tanent inexisting', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    await createTanentService.execute({
      name: 'Tenant',
      email: 'tenant@email.com.br',
      cpf: '111111',
      rg: '111111',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    await expect(
      updateTenentService.execute({
        name: 'Tenant3',
        email: 'tenant3@email.com.br',
        cpf: '4564564',
        rg: '111111',
        genre: 'M',
        marital_status: 'Casado',
        phone1: '123456',
        phone2: '123456',
        profession: 'dev',
        user_id: user.id,
        id: 'tenant-not-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
