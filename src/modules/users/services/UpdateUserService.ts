import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail && checkEmail.email !== user.email) {
      throw new AppError('This email is already registered');
    }

    user.password = await this.hashProvider.genereteHash(password);
    user.name = name;
    user.email = email;

    const updateUser = await this.userRepository.save(user);

    return updateUser;
  }
}

export default UpdateUserService;
