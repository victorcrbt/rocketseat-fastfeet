import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

export default routes;
