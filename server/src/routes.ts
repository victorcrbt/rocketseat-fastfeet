import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientsController';

// Input validators
import RecipientValidator from './app/validators/RecipientValidator';
import SessionValidator from './app/validators/SessionValidator';
import UserValidator from './app/validators/UserValidator';

const routes = Router();

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(authMiddleware);
routes.post('/users', UserValidator.store, UserController.store);

routes.get('/recipients', RecipientController.index);
routes.get(
  '/recipients/:recipient_id',
  RecipientValidator.show,
  RecipientController.show
);
routes.post('/recipients', RecipientValidator.store, RecipientController.store);
routes.put(
  '/recipients/:recipient_id',
  RecipientValidator.update,
  RecipientController.update
);
routes.delete(
  '/recipients/:recipient_id',
  RecipientValidator.destroy,
  RecipientController.destroy
);

export default routes;
