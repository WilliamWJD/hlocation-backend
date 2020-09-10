import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const routes = Router();

routes.get('/', PropertiesController.index);
routes.post('/', PropertiesController.store);

export default routes;
