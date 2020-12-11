import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePropertieService from '@modules/properties/services/CreatePropertieService';
import ListPropertieService from '@modules/properties/services/ListPropertieService';
import DeletePropertieSevice from '@modules/properties/services/DeletePropertieService';
import UpdatePropertieService from '@modules/properties/services/UpdatePropertieService';

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

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePropertie = container.resolve(DeletePropertieSevice);

    await deletePropertie.execute({
      id,
      user_id: req.user.id,
    });

    return res.json();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, number, rent_money } = req.body;

    const updatePropertie = container.resolve(UpdatePropertieService);

    const propertie = await updatePropertie.execute({
      id,
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
