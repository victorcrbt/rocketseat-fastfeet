import 'yup';
import { Model } from 'sequelize-typescript';

declare module 'yup' {
  interface StringSchema {
    existsWithID(model: typeof Model, msg: string): StringSchema;
  }
}
