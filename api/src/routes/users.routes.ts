import { Router } from 'express';
import { AuthenticateUserController } from '../modules/users/useCases/usersControllers/authenticate-user.controller';
import { CreateUserController } from '../modules/users/useCases/usersControllers/create-user.controller';
import { ensureAuthenticated } from '../shared/middleware/ensureAuthenticated';
import { CreateRefreshTokenController } from '../modules/users/useCases/usersControllers/create-refreshToken';

const userRoutes = Router();

const createUser = new CreateUserController();
const authenticateUser = new AuthenticateUserController();
const createRefreshToken = new CreateRefreshTokenController();

userRoutes.post('/', createUser.handle);
userRoutes.post('/login', authenticateUser.handle);
userRoutes.post(
  '/auth/refresh-token',
  /* ensureAuthenticated, */
  createRefreshToken.handle,
);
export { userRoutes };
