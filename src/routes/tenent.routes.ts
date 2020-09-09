import { Router } from 'express';

import TenentController from '../controllers/TenentController';

const routes = Router();

routes.post('/', TenentController.store);

export default routes;
