import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateTenentService from '@modules/tenents/services/CreateTenent';
import UpdateTenentService from '@modules/tenents/services/UpdateTenentService';
import ListTenantsByUser from '@modules/tenents/services/ListAllTenantsByUser';
import DeleteTenantService from '@modules/tenents/services/DeleteTenantService';

class TenentController {
  async index(req: Request, res: Response): Promise<Response> {
    const listTenantsService = container.resolve(ListTenantsByUser);
    const tenants = await listTenantsService.execute({ user_id: req.user.id });
    return res.json(tenants);
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

  async update(req: Request, res: Response): Promise<Response> {
    const { tenant_id } = req.params;

    const updateTenent = container.resolve(UpdateTenentService);
    const tenent = await updateTenent.execute({
      id: tenant_id,
      user_id: req.user.id,
      ...req.body,
    });
    return res.json(tenent);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { tenant_id } = req.params;

    const deleteTenant = container.resolve(DeleteTenantService);

    const tenant = await deleteTenant.execute({
      tenant_id,
      user_id: req.user.id,
    });

    return res.json(tenant);
  }
}

export default new TenentController();
