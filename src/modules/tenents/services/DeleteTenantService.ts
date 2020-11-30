import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import ITenentRepository from '../repositories/ITenentRepository';

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

  public async execute({ tenant_id, user_id }: IRequest): Promise<void> {
    const checkUser = await this.userRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User not found');
    }

    const id = tenant_id;

    const checkTenant = await this.tenentRepository.findById(id, user_id);

    if (!checkTenant) {
      throw new AppError('Tenant not found for authenticated user');
    }

    await this.tenentRepository.delete(tenant_id, user_id);
  }
}

export default DeleteTenantService;
