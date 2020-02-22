import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import {
  DeliverymanShowSchema,
  DeliverymanStoreSchema,
  DeliverymanUpdateSchema,
  DeliverymanDestroySchema,
} from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class RecipientValidator {
  public show: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliverymanShowSchema> = yup.object().shape({
      deliveryman: yup
        .string()
        .required('ID do entregador não informado.')
        .existsWithID(Deliveryman, 'Entregador não encontrado.'),
    });

    const fields = {
      deliveryman: req.params.deliveryman_id,
    };

    try {
      await schema.validate(fields, { abortEarly: false });

      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Falha na validação.', errors: error.inner });
    }
  };

  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliverymanStoreSchema> = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório.'),
      avatar_id: yup.number(),
      email: yup
        .string()
        .required('O campo e-mail é obrigatório.')
        .test(
          'unique',
          'E-mail já cadastrado para outro entregador.',
          async email => {
            if (!email) return false;

            const deliverymanExists = await Deliveryman.findOne({
              where: { email },
            });

            if (!deliverymanExists) return true;

            return false;
          }
        ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };

  public update: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliverymanUpdateSchema> = yup.object().shape({
      deliveryman: yup
        .string()
        .required('ID do entregador não informado.')
        .existsWithID(Deliveryman, 'Entregador não encontrado.'),
      name: yup.string().required('O campo nome é obrigatório.'),
      avatar_id: yup.number(),
      email: yup
        .string()
        .required('O campo e-mail é obrigatório.')
        .email('Formato de e-mail inválido.')
        .test(
          'unique',
          'E-mail já cadastrado para outro entregador.',
          // eslint-disable-next-line
          async function(email) {
            if (!email) return false;

            const deliverymanExists = await Deliveryman.findOne({
              where: { email },
            });

            // eslint-disable-next-line
            if (deliverymanExists && deliverymanExists.id !== Number(this.resolve(yup.ref('deliveryman')))) {
              return false;
            }

            return true;
          }
        ),
    });

    const fields = {
      ...req.body,
      deliveryman: req.params.deliveryman_id,
    };

    try {
      await schema.validate(fields, { abortEarly: false });

      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Falha na validação.', errors: error.inner });
    }
  };

  public destroy: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliverymanDestroySchema> = yup.object().shape({
      deliveryman: yup
        .string()
        .required('ID do entregador não informado.')
        .existsWithID(Deliveryman, 'Entregador não encontrado.'),
    });

    const fields = {
      deliveryman: req.params.deliveryman_id,
    };

    try {
      await schema.validate(fields, { abortEarly: false });

      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Falha na validação.', errors: error.inner });
    }
  };
}

export default new RecipientValidator();
