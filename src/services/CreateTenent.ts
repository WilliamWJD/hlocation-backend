import { getRepository, getCustomRepository } from 'typeorm';

import Tenent from '../models/Tenents';

import TenentCustomRepository from '../repositories/TenentRepository';

import AppError from '../errors/AppError';

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
    const tenentCustomRepository = getCustomRepository(TenentCustomRepository);

    const tenentByCpf = await tenentCustomRepository.findByCpf(cpf);

    if (tenentByCpf) {
      throw new AppError('This cpf already registered');
    }

    const tenentByRg = await tenentCustomRepository.findByRg(rg);

    if (tenentByRg) {
      throw new AppError('This rg already registered');
    }

    const tenentByMail = await tenentCustomRepository.findByEmail(email);

    if (tenentByMail) {
      throw new AppError('This email already registered');
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
