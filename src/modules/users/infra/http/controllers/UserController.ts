import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}

export default new UserController();
