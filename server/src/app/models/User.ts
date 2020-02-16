import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

class User extends Model {
  public readonly id: number;
  public email: string;
  public password_hash: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  public static boot(sequelize: Connection): typeof User {
    super.init(
      {
        email: Sequelize.INTEGER,
        password_hash: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }
}

export default User;
