import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Propertie from '../models/Propertie';

import CreatePropertieService from '../services/CreatePropertieService';

class PropertiesController {
  async index(req: Request, res: Response) {
    const propertieRepository = getRepository(Propertie);

    const properties = await propertieRepository.find({
      where: { user_id: req.user.id },
    });

    return res.json(properties);
  }

  async store(req: Request, res: Response) {
    const { title, description, number, rent_money } = req.body;

    const createPropertie = new CreatePropertieService();

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
