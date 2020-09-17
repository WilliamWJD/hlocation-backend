import { Router } from 'express';

import TenentController from '../controllers/TenentController';

const tenentRoutes = Router();

// tenentRoutes.get('/', TenentController.index);
tenentRoutes.post('/', TenentController.store);

export default tenentRoutes;
