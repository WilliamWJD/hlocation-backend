import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Location from '../models/Location';
// import User from '../models/User';
// import Tenent from '../models/Tenents';
// import Propertie from '../models/Propertie';

import UserCustomRepository from '../repositories/UserRepository';
import LocationCustomRepository from '../repositories/LocationRepository';
import PropertieCustomRepository from '../repositories/PropertieRepository';
// import TenentCustomRepository from '../repositories/TenentRepository';

interface Request {
  user_id: string;
  tenent_id: string;
  propertie_id: string;
  date_start: Date;
  date_end: Date;
}

class CreateLocationService {
  public async execute({
    user_id,
    tenent_id,
    propertie_id,
    date_start,
    date_end,
  }: Request): Promise<Location> {
    const locationCustomRepository = getCustomRepository(
      LocationCustomRepository,
    );
    // const tenentCustomRepository = getCustomRepository(TenentCustomRepository);
    const propertieCustomRepository = getCustomRepository(
      PropertieCustomRepository,
    );
    const userCustomRepository = getCustomRepository(UserCustomRepository);

    const locationRepository = getRepository(Location);

    // VERIFICA SE O USUÁRIO QUE ESTÁ CRIANDO EXISTE
    const findUser = await userCustomRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found');
    }

    // VERIFICA SE EXISTE UMA LOCAÇÃO ATIVA
    const findLocationActive = await locationCustomRepository.findLocationPropertie(
      propertie_id,
      user_id,
    );

    if (findLocationActive) {
      throw new AppError('this property already has an active lease');
    }

    // VERIFICA SE O IMÓVEL EXISTE
    const findPropertie = await propertieCustomRepository.findById(
      propertie_id,
      user_id,
    );

    if (!findPropertie) {
      throw new AppError('Propertie not found');
    }

    // CRIA LOCAÇÃO
    const location = locationRepository.create({
      user: findUser,
      tenent_id,
      propertie: findPropertie,
      date_start,
      date_end,
    });

    await locationRepository.save(location);

    return location;
  }
}

export default CreateLocationService;
