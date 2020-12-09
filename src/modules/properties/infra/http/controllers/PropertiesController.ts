import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePropertieService from '@modules/properties/services/CreatePropertieService';
import ListPropertieService from '@modules/properties/services/ListPropertieService';

class PropertiesController {
  async index(req: Request, res: Response): Promise<Response> {
    const listProperties = container.resolve(ListPropertieService);

    const properties = await listProperties.execute({ user_id: req.user.id });

    return res.json(properties);
  }

  async store(req: Request, res: Response) {
    const { title, description, number, rent_money } = req.body;

    const createPropertie = container.resolve(CreatePropertieService);

    const propertie = await createPropertie.execute({
      title,
      description,
      number,
      rent_money,
      user_id: req.user.id,
    });

    return res.json(propertie);
  }
}

export default new PropertiesController();
