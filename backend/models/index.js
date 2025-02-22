import { Sequelize } from 'sequelize';
import config from '../config/config.js';

import User from './user.js';
import OAuthClient from './oauthclient.js';
import OAuthToken from './oauthtoken.js';

const sequelize = new Sequelize({
  dialect: config.development.dialect,
  host: config.development.host,
  port: config.development.port,
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  logging: false
})

User.init(sequelize);
OAuthClient.init(sequelize);
OAuthToken.init(sequelize);

// Définition des relations
OAuthToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(OAuthToken, { foreignKey: 'userId' });
OAuthClient.hasMany(OAuthToken, { foreignKey: 'clientId' });

(async () => {
  await User.sync();
  await OAuthClient.sync();
  await OAuthToken.sync();
})();

export { sequelize, User, OAuthClient, OAuthToken };
