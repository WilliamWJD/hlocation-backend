import { Response, Request } from 'express';

class LocationController {
  async store(req: Request, res: Response) {
    return res.json({ ok: true });
  }
}

export default new LocationController();
