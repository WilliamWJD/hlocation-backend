import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
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

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id: req.user.id,
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export default new UserController();
