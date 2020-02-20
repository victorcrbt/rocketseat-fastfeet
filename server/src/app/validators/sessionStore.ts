import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

interface Schema {
  email: string;
  password: string;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const schema: yup.Schema<Schema> = yup.object().shape({
    email: yup.string().required('O campo e-mail é obrigatório.'),
    password: yup.string().required('O campo senha é obrigatório.'),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ msg: 'Falha na validação.', errors: error.inner });
  }
};
