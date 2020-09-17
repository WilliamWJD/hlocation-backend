import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Location from '@modules/locations/infra/typeorm/entities/Location';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';
import ITenentRepository from '@modules/tenents/repositories/ITenentRepository';
import ILocationRepository from '../repositories/ILocationRepository';

interface Request {
  user_id: string;
  tenent_id: string;
  propertie_id: string;
  date_start: Date;
  date_end: Date;
}

@injectable()
class CreateLocationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('LocationRepository')
    private locationRepository: ILocationRepository,

    @inject('PropertieRepository')
    private propertieRepository: IPropertiesRepository,

    @inject('TenentRepository')
    private tenentRepository: ITenentRepository,
  ) { }

  public async execute({
    user_id,
    tenent_id,
    propertie_id,
    date_start,
    date_end,
  }: Request): Promise<Location> {
    // VERIFICA SE O USUÁRIO QUE ESTÁ CRIANDO EXISTE
    const findUser = await this.userRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found');
    }

    // VERIFICA SE O INQUILINO EXISTE
    const findTenent = await this.tenentRepository.findById(tenent_id);

    if (!findTenent) {
      throw new AppError('Tenent not found');
    }

    // VERIFICA SE EXISTE UMA LOCAÇÃO ATIVA
    const findLocationActive = await this.locationRepository.findLocationPropertie(
      propertie_id,
      user_id,
    );

    if (findLocationActive) {
      throw new AppError('this property already has an active lease');
    }

    // VERIFICA SE O IMÓVEL EXISTE
    const findPropertie = await this.propertieRepository.findById(
      propertie_id,
      user_id,
    );

    if (!findPropertie) {
      throw new AppError('Propertie not found');
    }

    // CRIA LOCAÇÃO
    const location = await this.locationRepository.create({
      user: findUser,
      tenent: findTenent,
      propertie: findPropertie,
      date_start,
      date_end,
    });

    return location;
  }
}

export default CreateLocationService;
