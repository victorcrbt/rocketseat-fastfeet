import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

class Deliveryman extends Model {
  public readonly id: number;
  public name: string;
  public avatar_id: number;
  public email: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  public static boot(sequelize: Connection): typeof Deliveryman {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'deliverymen' }
    );

    return this;
  }

  public static associate(models): void {
    this.belongsTo(models.File, { targetKey: 'id', as: 'avatar' });
  }
}

export default Deliveryman;
