import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUser = await userRepository.findOne({
      where: { email },
    });

    if (checkUser) {
      throw Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = userRepository.create({ name, email, password: passwordHash });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
