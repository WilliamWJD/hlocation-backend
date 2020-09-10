import { Router } from 'express';

import TenentController from '../controllers/TenentController';

const routes = Router();

routes.get('/', TenentController.index);
routes.post('/', TenentController.store);

export default routes;
