import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Propertie from '../models/Propertie';
import User from '../models/User';

import PropertieRepository from '../repositories/PropertieRepository';

interface Request {
  title: string;
  description: string;
  number: number;
  rent_money: number;
  user_id: string;
}

class CreatePropertieService {
  public async execute({
    title,
    description,
    number,
    rent_money,
    user_id,
  }: Request): Promise<Propertie> {
    const propertieRepository = getRepository(Propertie);
    const userRepository = getRepository(User);
    const propertieCustomRepository = getCustomRepository(PropertieRepository);

    const userExists = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new AppError('User not found');
    }

    const checkPropertie = await propertieCustomRepository.getByTitle(
      title,
      user_id,
    );

    if (checkPropertie) {
      throw new AppError('User not found');
    }

    const propertie = propertieRepository.create({
      title,
      description,
      number,
      rent_money,
      user: userExists,
    });

    await propertieRepository.save(propertie);

    return propertie;
  }
}

export default CreatePropertieService;
