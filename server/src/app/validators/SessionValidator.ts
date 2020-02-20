import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { SessionStoreSchema } from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class SessionValidator {
  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<SessionStoreSchema> = yup.object().shape({
      email: yup.string().required('O campo e-mail é obrigatório.'),
      password: yup.string().required('O campo senha é obrigatório.'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };
}

export default new SessionValidator();
