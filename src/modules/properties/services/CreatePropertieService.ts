import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Propertie from '@modules/properties/infra/typeorm/entities/Propertie';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
// import User from '../models/User';

interface IRequest {
  title: string;
  description: string;
  number: number;
  rent_money: number;
  user_id: string;
}

@injectable()
class CreatePropertieService {
  constructor(
    @inject('PropertieRepository')
    private propertieRepository: IPropertiesRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async execute({
    title,
    description,
    number,
    rent_money,
    user_id,
  }: IRequest): Promise<Propertie> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found');
    }

    const checkPropertie = await this.propertieRepository.getByTitle(
      title,
      user_id,
    );

    if (checkPropertie) {
      throw new AppError('User not found');
    }

    const propertie = await this.propertieRepository.create({
      title,
      description,
      number,
      rent_money,
      user: userExists,
    });

    return propertie;
  }
}

export default CreatePropertieService;
