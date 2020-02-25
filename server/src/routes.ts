import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import DelivermanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientsController';

// Input validators
import DeliverymanValidator from './app/validators/DeliverymanValidator';
import DeliveryValidator from './app/validators/DeliveryValidator';
import DeliveryProblemValidator from './app/validators/DeliveryProblemValidator';
import PackageValidator from './app/validators/PackageValidator';
import RecipientValidator from './app/validators/RecipientValidator';
import SessionValidator from './app/validators/SessionValidator';
import UserValidator from './app/validators/UserValidator';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(authMiddleware);

/**
 * Users
 */
routes.post('/users', UserValidator.store, UserController.store);

/**
 * Recipients
 */
routes
  .route('/recipients')
  .get(RecipientController.index)
  .post(RecipientValidator.store, RecipientController.store);

routes
  .route('/recipients/:recipient_id')
  .get(RecipientValidator.show, RecipientController.show)
  .put(RecipientValidator.update, RecipientController.update)
  .delete(RecipientValidator.destroy, RecipientController.destroy);

/**
 * Deliverymen
 */
routes
  .route('/deliverymen')
  .get(DelivermanController.index)
  .post(DeliverymanValidator.store, DelivermanController.store);

routes
  .route('/deliverymen/:deliveryman_id')
  .get(DeliverymanValidator.show, DelivermanController.show)
  .put(DeliverymanValidator.update, DelivermanController.update)
  .delete(DeliverymanValidator.destroy, DelivermanController.destroy);

/**
 * Deliveries
 *
 * Change endpoint, table name and fix possible issues.
 * Prefered to make automated tests before to ensure that nothing will break.
 */
routes
  .route('/packages')
  .get(PackageController.index)
  .post(PackageValidator.store, PackageController.store);

routes
  .route('/packages/:package_id')
  .put(PackageValidator.update, PackageController.update);

/**
 * DeliveryProblems
 */
routes
  .route('/problem/:problem_id')
  .get(DeliveryProblemValidator.show, DeliveryProblemController.show);

routes
  .route('/packages/:package_id/problems')
  .get(DeliveryProblemController.index)
  .post(DeliveryProblemValidator.store, DeliveryProblemController.store);

routes
  .route('/problem/:problem_id/cancel_delivery')
  .delete(PackageValidator.destroy, PackageController.destroy);

/**
 * Deliveries
 */
routes
  .route('/deliverymen/:deliveryman_id/deliveries')
  .get(DeliveryController.index);

routes
  .route('/deliverymen/:deliveryman_id/deliveries/:package_id')
  .put(DeliveryValidator.update, DeliveryController.update);

/**
 * Files
 */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
