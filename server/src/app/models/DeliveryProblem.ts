import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

class DeliveryProblem extends Model {
  public readonly id: number;
  public package_id: number;
  public description: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  public static boot(sequelize: Connection): typeof DeliveryProblem {
    super.init(
      {
        package_id: Sequelize.INTEGER,
        description: Sequelize.TEXT,
      },
      { sequelize, tableName: 'delivery_problems' }
    );

    return this;
  }

  public static associate(models): void {
    this.belongsTo(models.Package, {
      foreignKey: 'package_id',
      as: 'package',
    });
  }
}

export default DeliveryProblem;
