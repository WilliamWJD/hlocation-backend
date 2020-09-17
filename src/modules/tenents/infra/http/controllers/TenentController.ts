import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateTenentService from '@modules/tenents/services/CreateTenent';

class TenentController {
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

    const createTenent = container.resolve(CreateTenentService);

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
