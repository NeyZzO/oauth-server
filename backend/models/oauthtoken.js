import { DataTypes, Model } from 'sequelize';

export default class OAuthToken extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'OAuthToken',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  }
}
