import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Tenent from '@modules/tenents/infra/typeorm/entities/Tenents';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ITenentRepository from '../repositories/ITenentRepository';

interface IRequest {
  id: string;
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
class UpdateTenentService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TenentRepository')
    private tenentRepository: ITenentRepository,
  ) {}

  public async execute({
    id,
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
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const tenent = await this.tenentRepository.findById(id, user_id);

    if (!tenent) {
      throw new AppError('Tenent not found');
    }

    const tenentByCpf = await this.tenentRepository.findByCpf(cpf, user_id);

    if (tenentByCpf && tenentByCpf.id !== id) {
      throw new AppError('This cpf already registered');
    }

    const tenentByRg = await this.tenentRepository.findByRg(rg, user_id);

    if (tenentByRg && tenentByRg.id !== id) {
      throw new AppError('This RG already registered');
    }

    tenent.name = name;
    tenent.rg = rg;
    tenent.cpf = cpf;
    tenent.genre = genre;
    tenent.profession = profession;
    tenent.marital_status = marital_status;
    tenent.phone1 = phone1;
    tenent.phone2 = phone2;
    tenent.email = email;
    tenent.user = user;

    const updateTenent = await this.tenentRepository.save(tenent);

    return updateTenent;
  }
}

export default UpdateTenentService;
