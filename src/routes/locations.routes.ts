import { Router } from 'express';

import LocationController from '../controllers/LocationController';

const locationRoutes = Router();

locationRoutes.post('/', LocationController.store);

export default locationRoutes;
