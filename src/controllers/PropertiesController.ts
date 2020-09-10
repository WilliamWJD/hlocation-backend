import { Request, Response } from 'express';

class PropertiesController {
  async store(req: Request, res: Response) {
    return res.json({ ok: true });
  }
}

export default new PropertiesController();
