import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ITenentRepository from '@modules/tenents/repositories/ITenentRepository';
import TenentRepository from '@modules/tenents/infra/typeorm/repositories/TenentRepository';

import IPropertieRepository from '@modules/properties/repositories/IPropertiesRepository';
import PropertieRepository from '@modules/properties/infra/typeorm/repositories/PropertieRepository';

import ILocationRepository from '@modules/locations/repositories/ILocationRepository';
import LocationRepository from '@modules/locations/infra/typeorm/repositories/LocationRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITenentRepository>(
  'TenentRepository',
  TenentRepository,
);

container.registerSingleton<IPropertieRepository>(
  'PropertieRepository',
  PropertieRepository,
);

container.registerSingleton<ILocationRepository>(
  'LocationRepository',
  LocationRepository,
);
