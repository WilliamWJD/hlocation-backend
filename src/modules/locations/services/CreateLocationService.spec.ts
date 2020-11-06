import FakePropertieRepository from '@modules/properties/repositories/fakes/FakePropertieRepository';
import FakeTenentRepository from '@modules/tenents/repositories/fakes/FakeTenentRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import CreatePropertieService from '@modules/properties/services/CreatePropertieService';
import CreateTenentService from '@modules/tenents/services/CreateTenent';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeLocationRepository from '../repositories/fakes/FakeLocationRepository';
import CreateLocationService from './CreateLocationService';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createTenantService: CreateTenentService;
let fakeTenantRepository: FakeTenentRepository;

let createPropertieService: CreatePropertieService;
let fakePropertieRepository: FakePropertieRepository;

let createLocationService: CreateLocationService;
let fakeLocationRepository: FakeLocationRepository;

describe('Create Location', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeTenantRepository = new FakeTenentRepository();
    createTenantService = new CreateTenentService(fakeTenantRepository);

    fakePropertieRepository = new FakePropertieRepository();
    createPropertieService = new CreatePropertieService(
      fakePropertieRepository,
      fakeUserRepository,
    );

    fakeLocationRepository = new FakeLocationRepository();
    createLocationService = new CreateLocationService(
      fakeUserRepository,
      fakeLocationRepository,
      fakePropertieRepository,
      fakeTenantRepository,
    );
  });

  it('should be able to create a new location', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTenantService.execute({
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

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    const location = await createLocationService.execute({
      user_id: user.id,
      tenant_id: tenant.id,
      propertie_id: propertie.id,
      date_start: new Date(2020, 11, 6),
      date_end: new Date(2021, 11, 6),
    });

    expect(location).toHaveProperty('id');
  });

  it('should not be able to create a new location with an user not existing', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTenantService.execute({
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

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    await expect(
      createLocationService.execute({
        user_id: 'user-not-existing',
        tenant_id: tenant.id,
        propertie_id: propertie.id,
        date_start: new Date(2020, 11, 6),
        date_end: new Date(2021, 11, 6),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new location with an tenant not existing', async () => {
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

    await expect(
      createLocationService.execute({
        user_id: user.id,
        tenant_id: 'tenant-not-existing',
        propertie_id: propertie.id,
        date_start: new Date(2020, 11, 6),
        date_end: new Date(2021, 11, 6),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new location with an propertie alredy', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTenantService.execute({
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
      createLocationService.execute({
        user_id: user.id,
        tenant_id: tenant.id,
        propertie_id: 'propertie-not-existing',
        date_start: new Date(2020, 11, 6),
        date_end: new Date(2021, 11, 6),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a lease with a property already leased', async () => {
    const user = await createUserService.execute({
      name: 'fulano',
      email: 'fulano@email.com.br',
      password: '123456',
    });

    const tenant = await createTenantService.execute({
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

    const propertie = await createPropertieService.execute({
      title: 'propertie1',
      description: 'lorem ipsun sit dolor',
      number: 500,
      rent_money: 550,
      user_id: user.id,
    });

    await createLocationService.execute({
      user_id: user.id,
      tenant_id: tenant.id,
      propertie_id: propertie.id,
      date_start: new Date(2020, 11, 6),
      date_end: new Date(2021, 11, 6),
    });

    await expect(
      createLocationService.execute({
        user_id: user.id,
        tenant_id: tenant.id,
        propertie_id: propertie.id,
        date_start: new Date(2020, 11, 6),
        date_end: new Date(2021, 11, 6),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
