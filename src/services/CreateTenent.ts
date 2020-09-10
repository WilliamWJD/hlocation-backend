import { getRepository } from 'typeorm';

import Tenent from '../models/Tenents';

interface Request {
  name: string;
  rg: string;
  cpf: string;
  genre: string;
  profession: string;
  marital_status: string;
  phone1: string;
  phone2: string;
  email: string;
  user_id: string;
}

class CreateTenentService {
  public async execute({
    name,
    rg,
    cpf,
    genre,
    profession,
    marital_status,
    phone1,
    phone2,
    email,
    user_id,
  }: Request): Promise<Tenent> {
    const tenentRepository = getRepository(Tenent);

    const findByCpf = await tenentRepository.findOne({
      where: {
        cpf,
        user_id,
      },
    });

    if (findByCpf) {
      throw Error('This cpf already registered');
    }

    const findByRg = await tenentRepository.findOne({
      where: {
        rg,
        user_id,
      },
    });

    if (findByRg) {
      throw Error('This RG already registered');
    }

    if (email) {
      const findByMail = await tenentRepository.findOne({
        where: {
          email,
          user_id,
        },
      });

      if (findByMail) {
        throw Error('This email already registered');
      }
    }

    const tenent = tenentRepository.create({
      name,
      rg,
      cpf,
      genre,
      profession,
      marital_status,
      phone1,
      phone2,
      email,
      user_id,
    });

    await tenentRepository.save(tenent);

    return tenent;
  }
}

export default CreateTenentService;
