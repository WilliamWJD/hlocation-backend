import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class SessionService {
  constructor(
    @inject('UserRepository')
    private sessionRepository: IUserRepository,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.sessionRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or Password invalid', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email or Password invalid', 401);
    }

    const token = jwt.sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default SessionService;