import { Router } from 'express';

import TenentController from '../controllers/TenentController';

const tenentRoutes = Router();

// tenentRoutes.get('/', TenentController.index);
tenentRoutes.post('/', TenentController.store);
tenentRoutes.put('/:tenant_id', TenentController.update);
tenentRoutes.delete('/:tenant_id', TenentController.delete);
tenentRoutes.get('/', TenentController.index);

export default tenentRoutes;
