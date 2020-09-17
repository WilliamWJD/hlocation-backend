import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/UpdateUserAvatarService';

class UpdataUserAvatarController {
  async save(req: Request, res: Response) {
    const avatar = req.file.filename;
    const user_id = req.user.id;

    const updateUserAvatar = container.resolve(CreateUserService);

    const user = await updateUserAvatar.execute({
      user_id,
      avatar,
    });

    delete user.password;

    return res.json(user);
  }
}

export default new UpdataUserAvatarController();
