import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import Package from '../models/Package';
import { DeliveryProblemStoreSchema } from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class UserValidator {
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

export default new UserValidator();
