import { Router } from 'express';

import userRoutes from './users.routes';
import tenentRoutes from './tenent.routes';
import propertieRoutes from './properties.routes';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/tenents', tenentRoutes);

routes.use('/properties', propertieRoutes);

export default routes;
