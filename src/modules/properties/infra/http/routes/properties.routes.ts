import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const propertieRoutes = Router();

propertieRoutes.post('/', PropertiesController.store);
propertieRoutes.get('/', PropertiesController.index);
propertieRoutes.delete('/:id', PropertiesController.delete);
propertieRoutes.put('/:id', PropertiesController.update);

export default propertieRoutes;
