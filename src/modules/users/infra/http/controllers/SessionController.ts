import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import SessionService from '@modules/users/services/SessionService';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const sessionUser = container.resolve(SessionService);

    const { user, token } = await sessionUser.execute({ email, password });

    return res.json({ user:classToClass(user), token });
  }
}

export default new SessionController();
