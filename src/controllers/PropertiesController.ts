import { Request, Response } from 'express';

import CreatePropertieService from '../services/CreatePropertieService';

class PropertiesController {
  async store(req: Request, res: Response) {
    try {
      const { title, description, number, rent_money, user_id } = req.body;

      const createPropertie = new CreatePropertieService();

      const propertie = await createPropertie.execute({
        title,
        description,
        number,
        rent_money,
        user_id,
      });

      return res.json(propertie);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export default new PropertiesController();
