import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import userStoreValidation from './app/validators/userStore';
import sessionStoreValidation from './app/validators/sessionStore';

const routes = Router();

routes.post('/sessions', sessionStoreValidation, SessionController.store);

routes.use(authMiddleware);
routes.post('/users', userStoreValidation, UserController.store);

export default routes;
