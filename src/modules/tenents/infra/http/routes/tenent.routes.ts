import { Router } from 'express';

import TenentController from '../controllers/TenentController';

const tenentRoutes = Router();

// tenentRoutes.get('/', TenentController.index);
tenentRoutes.post('/', TenentController.store);
tenentRoutes.put('/', TenentController.update);

export default tenentRoutes;
