import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import Recipient from '../models/Recipient';

interface Schema {
  name: string;
  address: string;
  address_number: string;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
  recipient: string;
}

const states = [
  'AC',
  'AL',
  'AP',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const schema: yup.Schema<Schema> = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório.'),
    address: yup.string().required('O campo endereço é obrigatório.'),
    address_number: yup.string(),
    complement: yup.string(),
    state: yup
      .string()
      .uppercase()
      .required('O campo estado é obrigatório.')
      .oneOf(states, 'O estado informado não é válido.'),
    city: yup.string().required('O campo cidade é obrigatório.'),
    zip_code: yup.string().required('O campo CEP é obrigatório.'),
    recipient: yup
      .string()
      .required('ID do destinatário não informado.')
      .existsWithID(Recipient, 'Destinatário não encontrado.'),
  });

  const fields = {
    ...req.body,
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
