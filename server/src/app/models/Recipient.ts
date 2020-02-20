import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

class Recipient extends Model {
  public readonly id: number;
  public name: string;
  public address: string;
  public address_number: string;
  public complement: string;
  public state: string;
  public city: string;
  public zip_code: string;
  public readonly created_at: Date;
  public readonly update_at: Date;

  public static boot(sequelize: Connection): typeof Recipient {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        address_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Recipient;
