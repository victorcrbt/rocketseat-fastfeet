import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import Recipient from '../models/Recipient';
import {
  RecipientShowSchema,
  RecipientStoreSchema,
  RecipientUpdateSchema,
  RecipientDestroySchema,
} from './types';

interface MethodInterface {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
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

class RecipientValidator {
  public show: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<RecipientShowSchema> = yup.object().shape({
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

  public store: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<RecipientStoreSchema> = yup.object().shape({
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
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.inner });
    }
  };

  public update: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<RecipientUpdateSchema> = yup.object().shape({
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

  public destroy: MethodInterface = async (req, res, next) => {
    const schema: yup.Schema<RecipientDestroySchema> = yup.object().shape({
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
}

export default new RecipientValidator();
