import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import Recipient from '../models/Recipient';

interface ShowSchema {
  recipient: string;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: yup.Schema<ShowSchema> = yup.object().shape({
    recipient: yup
      .string()
      .required('ID do destinatário não informado.')
      .existsWithID(Recipient, 'Destinatário não encontrado.'),
  });

  const fields = {
    recipient: req.params.recipient_id,
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
