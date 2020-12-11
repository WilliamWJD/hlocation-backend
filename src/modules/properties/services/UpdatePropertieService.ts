import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Propertie from '../infra/typeorm/entities/Propertie';

interface Request {
  id: string;
  title: string;
  description: string;
  number: number;
  rent_money: number;
  user_id: string;
}

@injectable()
class UpdatePropertieService {
  constructor(
    @inject('PropertieRepository')
    private propertieRepository: IPropertiesRepository,
  ) {}

  public async execute({
    id,
    title,
    description,
    number,
    rent_money,
    user_id,
  }: Request): Promise<Propertie> {
    const propertie = await this.propertieRepository.findById(id, user_id);

    if (!propertie) {
      throw new AppError('Propertie not found');
    }

    propertie.title = title;
    propertie.description = description;
    propertie.number = number;
    propertie.rent_money = rent_money;
    propertie.user_id = user_id;

    const updatePropertie = await this.propertieRepository.update(propertie);

    return updatePropertie;
  }
}

export default UpdatePropertieService;
