import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Tenent from '../models/Tenents';

import TenentService from '../services/CreateTenent';

class TenentController {
  async index(req: Request, res: Response) {
    const tenentRepository = getRepository(Tenent);

    const tenents = await tenentRepository.find({
      where: { user_id: req.user.id },
    });

    return res.json(tenents);
  }

  async store(req: Request, res: Response) {
    const {
      name,
      rg,
      cpf,
      genre,
      profession,
      marital_status,
      phone1,
      phone2,
      email,
    } = req.body;

    const createTenent = new TenentService();

    const tenent = await createTenent.execute({
      name,
      rg,
      cpf,
      genre,
      profession,
      marital_status,
      phone1,
      phone2,
      email,
      user_id: req.user.id,
    });

    return res.json(tenent);
  }
}

export default new TenentController();
