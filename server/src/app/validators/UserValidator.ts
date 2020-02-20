import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import User from '../models/User';
import { UserStoreSchema } from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

class UserValidator {
  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<UserStoreSchema> = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório.'),
      email: yup
        .string()
        .required('O campo e-mail é obrigatório.')
        .test('unique', 'O e-mail informado já está em uso.', async email => {
          if (!email) return false;

          const userExists = await User.findOne({ where: { email } });

          if (!userExists) return true;

          return false;
        }),
      password: yup
        .string()
        .required('O campo senha é obrigatório.')
        .min(6, 'A senha deve conter ao menos 6 caractéres.'),
      password_confirmation: yup.string().when(
        'password',
        (password, field) =>
          // eslint-disable-next-line operator-linebreak
          password &&
          field
            .required('A confirmação de senha é obrigatória.')
            .oneOf([yup.ref('password')], 'As senhas não coincidem.')
      ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };
}

export default new UserValidator();
