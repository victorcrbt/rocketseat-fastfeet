import 'sequelize';

declare module 'sequelize' {
  export abstract class Model {
    static associate(models: object): void;
  }
}
