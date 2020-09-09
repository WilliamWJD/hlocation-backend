import { Router } from 'express';

import userRoutes from './users.routes';
import tenentRoutes from './tenent.routes';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/tenents', tenentRoutes);

export default routes;
