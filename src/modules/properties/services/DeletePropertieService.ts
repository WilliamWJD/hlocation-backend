import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IPropertiesRepository from '../repositories/IPropertiesRepository';

interface Request {
  id: string;
  user_id: string;
}

@injectable()
class DeletePropertieSevice {
  constructor(
    @inject('PropertieRepository')
    private propertieRepository: IPropertiesRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, user_id }: Request): Promise<void> {
    const checkUser = await this.userRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User not found');
    }

    const checkPropertie = await this.propertieRepository.findById(id, user_id);

    if (!checkPropertie) {
      throw new AppError('Propertie not found');
    }

    await this.propertieRepository.delete(id, user_id);
  }
}

export default DeletePropertieSevice;
