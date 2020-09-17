import { container } from 'tsyringe';
import { Response, Request } from 'express';

import LocationService from '@modules/locations/services/CreateLocationService';

class LocationController {
  async store(req: Request, res: Response) {
    const { tenent_id, propertie_id, date_start, date_end } = req.body;

    const createLocation = container.resolve(LocationService);

    const location = await createLocation.execute({
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
