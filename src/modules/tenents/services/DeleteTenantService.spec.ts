import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeTenentRepository from '../repositories/fakes/FakeTenentRepository';
import CreateTenentService from './CreateTenent';
import DeleteTenantService from './DeleteTenantService';

let fakeTenentRepository: FakeTenentRepository;
let createTenentService: CreateTenentService;

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let deleteTenantService: DeleteTenantService;

describe('Delete Tenant', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeTenentRepository = new FakeTenentRepository();
    createTenentService = new CreateTenentService(fakeTenentRepository);

    deleteTenantService = new DeleteTenantService(
      fakeTenentRepository,
      fakeUserRepository,
    );
  });

  it('should be able to delete a tenant', async () => {
    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant1 = await createTenentService.execute({
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

    await createTenentService.execute({
      name: 'Tenant2',
      email: 'tenant2@email.com.br',
      cpf: '2222',
      rg: '2222',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    await expect(
      deleteTenantService.execute({
        tenant_id: tenant1.id,
        user_id: user.id,
      }),
    );
  });
});
