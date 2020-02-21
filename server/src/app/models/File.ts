import Sequelize, { Sequelize as Connection } from 'sequelize';
import { Model } from 'sequelize-typescript';

class File extends Model {
  public readonly id: number;
  public original_name: string;
  public name: string;
  public mime_type: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  public static boot(sequelize: Connection): typeof File {
    super.init(
      {
        original_name: Sequelize.STRING,
        name: Sequelize.STRING,
        mime_type: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
