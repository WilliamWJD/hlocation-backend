import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      throw Error('Email or Password invalid');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Email or Password invalid');
    }

    const token = jwt.sign({}, 'bd2b25a1acebe49300879f4460ac82c3', {
      subject: user.id,
      expiresIn: '7d',
    });

    return { user, token };
  }
}

export default SessionService;
