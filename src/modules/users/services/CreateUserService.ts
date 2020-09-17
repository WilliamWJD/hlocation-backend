import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUser = await this.userRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
