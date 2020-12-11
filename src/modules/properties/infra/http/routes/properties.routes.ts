import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const propertieRoutes = Router();

propertieRoutes.post('/', PropertiesController.store);
propertieRoutes.get('/', PropertiesController.index);
propertieRoutes.delete('/:id', PropertiesController.delete);

export default propertieRoutes;
