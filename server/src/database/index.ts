import { Sequelize } from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';

import config from '../config/database';

const models = [User, Recipient, File];

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
