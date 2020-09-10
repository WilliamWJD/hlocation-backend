import { getRepository } from 'typeorm';

import Propertie from '../models/Propertie';
import User from '../models/User';

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

    const userPropertie = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!userPropertie) {
      throw Error('User not found');
    }

    const propertie = propertieRepository.create({
      title,
      description,
      number,
      rent_money,
      user: userPropertie,
    });

    await propertieRepository.save(propertie);

    return propertie;
  }
}

export default CreatePropertieService;
