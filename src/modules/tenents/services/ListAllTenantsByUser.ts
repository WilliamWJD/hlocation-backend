import { inject, injectable } from 'tsyringe';

import Tenent from '../infra/typeorm/entities/Tenents';
import ITenentRepository from '../repositories/ITenentRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListTenantsByUser {
  constructor(
    @inject('TenentRepository')
    private tenentRepository: ITenentRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Tenent[] | undefined> {
    const tenants = this.tenentRepository.findAll(user_id);
    return tenants || undefined;
  }
}

export default ListTenantsByUser;
