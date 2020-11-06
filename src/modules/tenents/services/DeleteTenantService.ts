import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import ITenentRepository from '../repositories/ITenentRepository';
import Tenent from '../infra/typeorm/entities/Tenents';

interface IRequest {
  tenant_id: string;
  user_id: string;
}

@injectable()
class DeleteTenantService {
  constructor(
    @inject('TenentRepository')
    private tenentRepository: ITenentRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ tenant_id, user_id }: IRequest): Promise<Tenent> {
    const checkUser = await this.userRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User not found');
    }

    const tenant = await this.tenentRepository.delete(tenant_id, user_id);

    return tenant;
  }
}

export default DeleteTenantService;
