import { Request, Response } from 'express';
import TenentService from '../services/CreateTenent';

class TenentController {
  async store(req: Request, res: Response) {
    try {
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
      });

      return res.json(tenent);
    } catch (err) {
      return res.json(err.message);
    }
  }
}

export default new TenentController();
