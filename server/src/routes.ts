import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import DelivermanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientsController';

// Input validators
import DeliverymanValidator from './app/validators/DeliverymanValidator';
import PackageValidator from './app/validators/PackageValidator';
import RecipientValidator from './app/validators/RecipientValidator';
import SessionValidator from './app/validators/SessionValidator';
import UserValidator from './app/validators/UserValidator';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(authMiddleware);
routes.post('/users', UserValidator.store, UserController.store);

/**
 * Recipients
 */
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

/**
 * Deliverymen
 */
routes.get('/deliverymen', DelivermanController.index);
routes.get(
  '/deliverymen/:deliveryman_id',
  DeliverymanValidator.show,
  DelivermanController.show
);
routes.post(
  '/deliverymen',
  DeliverymanValidator.store,
  DelivermanController.store
);
routes.put(
  '/deliverymen/:deliveryman_id',
  DeliverymanValidator.update,
  DelivermanController.update
);
routes.delete(
  '/deliverymen/:deliveryman_id',
  DeliverymanValidator.destroy,
  DelivermanController.destroy
);

/**
 * Packages
 */
routes.get('/packages', PackageValidator.show, PackageController.index);
routes.post('/packages', PackageValidator.store, PackageController.store);
routes.put(
  '/packages/:package_id',
  PackageValidator.update,
  PackageController.update
);
routes.delete(
  '/packages/:package_id',
  PackageValidator.destroy,
  PackageController.destroy
);

/**
 * Files
 */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
