import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  async setAvatar(req: Request, res: Response) {
    try {
      const avatar = req.file.filename;
      const user_id = req.user.id;

      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id,
        avatar,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export default new UserController();
