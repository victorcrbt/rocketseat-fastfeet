import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { isBefore, isAfter } from 'date-fns';

import throwValidationError from '../../utils/throwValidationError';

import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import { DeliveryUpdateSchema } from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class DeliveryValidator {
  public update: MethodInterface = async (req, res, next) => {
    const currentPackage = await Package.findByPk(req.params.package_id);

    const schema: yup.Schema<DeliveryUpdateSchema> = yup.object().shape({
      deliveryman_id: yup
        .string()
        .required('ID do entregador não informado.')
        .existsWithID(Deliveryman, 'Entregador não encontrado.'),
      package_id: yup
        .string()
        .required('ID da encomenda não informado.')
        .existsWithID(Package, 'Encomenda não encontrada.'),
      start_date: yup
        .date()
        .test(
          'canWithdraw',
          'Encomendas só podem ser retiradas entre as 08:00 e 18:00.',
          date => {
            const today = new Date();
            const minHour = new Date(today.setHours(7, 59, 59));
            const maxHour = new Date(today.setHours(18, 0, 59));

            if (isBefore(date, minHour) || isAfter(date, maxHour)) return false;

            return true;
          }
        )
        .test(
          'alreadyCanceled',
          'Não é possível iniciar uma entrega cancelada.',
          // eslint-disable-next-line func-names, space-before-function-paren
          date => {
            if (date && currentPackage?.canceled_at) return false;

            return true;
          }
        ),
      end_date: yup
        .date()
        .test(
          'alreadyCanceled',
          'Não é possível finalizar uma entrega cancelada.',
          // eslint-disable-next-line func-names, space-before-function-paren
          date => {
            if (date && currentPackage?.canceled_at) return false;

            return true;
          }
        )
        .test(
          'beforeCurrentTime',
          'A hora de entrega não pode ser inferior a hora atual.',
          async date => {
            const now = new Date();

            if (isBefore(date, now)) return false;

            return true;
          }
        ),
      signature_id: yup.number().when(
        'end_date',
        (end_date, field) =>
          // eslint-disable-next-line operator-linebreak
          end_date &&
          field.required(
            'Para finalizar a entrega é necessário enviar a assinatura do recebedor.'
          )
      ),
    });

    const fields = {
      ...req.body,
      deliveryman_id: req.params.deliveryman_id,
      package_id: req.params.package_id,
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

export default new DeliveryValidator();
