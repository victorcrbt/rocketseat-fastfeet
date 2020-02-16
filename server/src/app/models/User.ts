import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

class User extends Model {
  public readonly id: number;
  public email: string;
  public password: string;
  public password_hash: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  public static boot(sequelize: Connection): typeof User {
    super.init(
      {
        email: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }
}

export default User;
