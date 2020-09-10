import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const routes = Router();

routes.get('/', PropertiesController.store);

export default routes;
