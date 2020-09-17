import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';

import ITenentRepository from '../repositories/ITenentRepository';

interface IRequest {
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

@injectable()
class CreateTenentService {
  constructor(
    @inject('TenentRepository')
    private tenentRepository: ITenentRepository,
  ) { }

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
  }: IRequest): Promise<Tenent> {
    const tenentByCpf = await this.tenentRepository.findByCpf(cpf);

    if (tenentByCpf) {
      throw new AppError('This cpf already registered');
    }

    const tenentByRg = await this.tenentRepository.findByRg(rg);

    if (tenentByRg) {
      throw new AppError('This rg already registered');
    }

    const tenentByMail = await this.tenentRepository.findByEmail(email);

    if (tenentByMail) {
      throw new AppError('This email already registered');
    }

    const tenent = await this.tenentRepository.create({
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

    return tenent;
  }
}

export default CreateTenentService;
