import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const propertieRoutes = Router();

propertieRoutes.post('/', PropertiesController.store);

export default propertieRoutes;
