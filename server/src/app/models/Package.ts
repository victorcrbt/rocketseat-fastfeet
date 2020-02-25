import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

import Deliveryman from './Deliveryman';
import File from './File';
import Recipient from './Recipient';

class Package extends Model {
  public readonly id: number;
  public recipient_id: number;
  public deliveryman_id: number;
  public signature_id: number;
  public product: string;
  public canceled_at: Date;
  public start_date: Date;
  public end_date: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deliveryman: Deliveryman;
  public readonly file: File;
  public readonly recipient: Recipient;

  public static boot(sequelize: Connection): typeof Package {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  public static associate(models): void {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Package;
