import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const propertieRoutes = Router();

propertieRoutes.get('/', PropertiesController.index);
propertieRoutes.post('/', PropertiesController.store);

export default propertieRoutes;
