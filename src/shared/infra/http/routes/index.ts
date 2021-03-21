import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';
import authMiddleware from '@modules/users/infra/http/middlewares/auth';

import tenentRoutes from '@modules/tenents/infra/http/routes/tenent.routes';
import propertieRoutes from '@modules/properties/infra/http/routes/properties.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import locationRoutes from '@modules/locations/infra/http/routes/locations.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

routes.use(authMiddleware);

routes.use('/tenants', tenentRoutes);

routes.use('/properties', propertieRoutes);

routes.use('/locations', locationRoutes);

export default routes;
