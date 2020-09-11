import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class SessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const sessionRepository = getRepository(User);

    const user = await sessionRepository.findOne({
      where: { email },
    });

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
