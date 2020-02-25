import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import { DeliveryProblemStoreSchema, DeliveryProblemShowSchema } from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class DeliveryProblemValidator {
  public show: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliveryProblemShowSchema> = yup.object().shape({
      problem_id: yup
        .string()
        .required('ID do problema não informado.')
        .existsWithID(DeliveryProblem, 'Problema não encontrada.'),
    });

    const fields = {
      ...req.body,
      problem_id: req.params.problem_id,
    };

    try {
      await schema.validate(fields, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };

  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<DeliveryProblemStoreSchema> = yup.object().shape({
      package_id: yup
        .string()
        .required('ID da entrega não informado.')
        .existsWithID(Package, 'Entrega não encontrada.'),
      description: yup.string().required('O campo descrição é obrigatório.'),
    });

    const fields = {
      ...req.body,
      package_id: req.params.package_id,
    };

    try {
      await schema.validate(fields, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };
}

export default new DeliveryProblemValidator();
