import { Router } from 'express';

import authMiddleware from '../middlewares/auth';

import userRoutes from './users.routes';
import tenentRoutes from './tenent.routes';
import propertieRoutes from './properties.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/sessions', sessionRoutes);

routes.use(authMiddleware);

routes.use('/tenents', tenentRoutes);

routes.use('/properties', propertieRoutes);

export default routes;
