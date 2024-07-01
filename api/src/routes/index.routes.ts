import { Router } from 'express';
import { userRoutes } from './users.routes';
import { cobrancasRoutes } from './cobrancas.routes';

const routes = Router();

routes.use('/api/users', userRoutes);
routes.use('/api/cobrancas', cobrancasRoutes);

export { routes };
