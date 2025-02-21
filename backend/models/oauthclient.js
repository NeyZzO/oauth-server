import { DataTypes, Model } from 'sequelize';

export default class OAuthClient extends Model {
  static init(sequelize) {
    super.init(
      {
        clientId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        clientSecret: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        redirectUri: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        scope: {
          type: DataTypes.STRING,
          defaultValue: 'read write',
        },
      },
      {
        sequelize,
        modelName: 'OAuthClient',
      }
    );
  }
}
