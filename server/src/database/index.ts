import { Sequelize } from 'sequelize';

import User from '../app/models/User';

import config from '../config/database';

const models = [User];

class Database {
  connection: Sequelize;

  constructor() {
    this.init();
  }

  private init(): void {
    this.connection = new Sequelize(config);

    models
      .map(model => model.boot(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();