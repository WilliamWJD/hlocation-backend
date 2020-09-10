import { Router } from 'express';

import PropertiesController from '../controllers/PropertiesController';

const routes = Router();

routes.post('/', PropertiesController.store);

export default routes;
