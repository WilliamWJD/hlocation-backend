import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import Properties from '../infra/typeorm/entities/Propertie';

import IPropertiesRepository from '../repositories/IPropertiesRepository';

interface Request {
  user_id: string;
}

@injectable()
class ListPropertieService {
  constructor(
    @inject('PropertieRepository')
    private propertieRepository: IPropertiesRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
  }: Request): Promise<Properties[] | undefined> {
    const checkUser = await this.userRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User not found');
    }

    const properties = await this.propertieRepository.findPropertiesByUser(
      user_id,
    );

    return properties;
  }
}

export default ListPropertieService;
