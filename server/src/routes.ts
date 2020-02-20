import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientsController';

import userStoreValidation from './app/validators/userStore';
import sessionStoreValidation from './app/validators/sessionStore';
import recipientStoreValidation from './app/validators/recipientStore';
import recipientUpdateValidation from './app/validators/recipientUpdate';
import recipientShowValidation from './app/validators/recipientShow';

const routes = Router();

routes.post('/sessions', sessionStoreValidation, SessionController.store);

routes.use(authMiddleware);
routes.post('/users', userStoreValidation, UserController.store);

routes.get('/recipients', RecipientController.index);
routes.get(
  '/recipients/:recipient_id',
  recipientShowValidation,
  RecipientController.show
);
routes.post('/recipients', recipientStoreValidation, RecipientController.store);
routes.put(
  '/recipients/:recipient_id',
  recipientUpdateValidation,
  RecipientController.update
);

export default routes;
