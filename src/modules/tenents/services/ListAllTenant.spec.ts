import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllTenantsByUser from './ListAllTenantsByUser';
import FakeTenentRepository from '../repositories/fakes/FakeTenentRepository';
import CreateTenentService from './CreateTenent';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createTenantService: CreateTenentService;
let fakeTenantRepository: FakeTenentRepository;

let listAllTenantsByUser: ListAllTenantsByUser;

describe('List all Tenants', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeTenantRepository = new FakeTenentRepository();

    createTenantService = new CreateTenentService(fakeTenantRepository);

    listAllTenantsByUser = new ListAllTenantsByUser(fakeTenantRepository);
  });

  it('should be able to list all tenants by user', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant1 = await createTenantService.execute({
      name: 'Tenant1',
      email: 'tenant1@email.com.br',
      cpf: '1111',
      rg: '1111',
      genre: 'M',
      marital_status: 'Casado',
      phone1: '123456',
      phone2: '123456',
      profession: 'dev',
      user_id: user.id,
    });

    const tenant2 = await createTenantService.execute({
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

    const tenantsByUser = await listAllTenantsByUser.execute({
      user_id: user.id,
    });

    expect(tenantsByUser).toEqual([tenant1, tenant2]);
  });
});
