import { Response, Request } from 'express';

import LocationService from '../services/CreateLocationService';

class LocationController {
  async store(req: Request, res: Response) {
    const { tenent_id, propertie_id, date_start, date_end } = req.body;

    const locationService = new LocationService();

    const location = await locationService.execute({
      user_id: req.user.id,
      tenent_id,
      propertie_id,
      date_start,
      date_end,
    });

    return res.json(location);
  }
}

export default new LocationController();
