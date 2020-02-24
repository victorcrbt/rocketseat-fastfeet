import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { isBefore, isAfter } from 'date-fns';

import Package from '../models/Package';
import {
  PackageShowSchema,
  PackageStoreSchema,
  PackageUpdateSchema,
  PackageDestroySchema,
} from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class DelivermanValidator {
  public show: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<PackageShowSchema> = yup.object().shape({
      package_id: yup
        .string()
        .required('ID da encomenda não informado.')
        .existsWithID(Package, 'Entregador não encontrado.'),
    });

    const fields = {
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

  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<PackageStoreSchema> = yup.object().shape({
      deliveryman_id: yup.number().required('O entregador é obrigatório.'),
      recipient_id: yup.number().required('O destinatário é obrigatório.'),
      product: yup.string().required('O produto é obrigatório.'),
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
    const currentPackage = await Package.findByPk(req.params.package_id);

    const schema: yup.Schema<PackageUpdateSchema> = yup.object().shape({
      package_id: yup
        .string()
        .required('ID da encomenda não informado.')
        .existsWithID(Package, 'Encomenda não encontrada.'),
      recipient_id: yup.number().required('O entregador é obrigatório.'),
      deliveryman_id: yup.number().required('O destinatário é obrigatório.'),
      product: yup.string().required('O produto é obrigatório.'),
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
      canceled_at: yup
        .date()
        .test(
          'alreadyEnded',
          'Não é possível cancelar uma entrega finalizada.',
          // eslint-disable-next-line func-names, space-before-function-paren
          date => {
            if (date && currentPackage?.end_date) return false;

            return true;
          }
        )
        .test(
          'beforeCurrentTime',
          'A hora de cancelamento não pode ser inferior a hora atual.',
          date => {
            const now = new Date();

            if (isBefore(date, now)) return false;

            return true;
          }
        ),
    });

    const fields = {
      ...req.body,
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

  public destroy: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<PackageDestroySchema> = yup.object().shape({
      package_id: yup
        .string()
        .required('ID da encomenda não informado.')
        .existsWithID(Package, 'Encomenda não encontrada.'),
    });

    const fields = {
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

export default new DelivermanValidator();
