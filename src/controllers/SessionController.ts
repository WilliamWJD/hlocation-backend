import { Request, Response } from 'express';

import SessionService from '../services/SessionService';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const sessionUser = new SessionService();

    const { user, token } = await sessionUser.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  }
}

export default new SessionController();
