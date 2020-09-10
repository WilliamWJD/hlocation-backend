import { Request, Response } from 'express';

import SessionService from '../services/SessionService';

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const sessionUser = new SessionService();

      const { user, token } = await sessionUser.execute({ email, password });

      delete user.password;

      return res.json({ user, token });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export default new SessionController();
