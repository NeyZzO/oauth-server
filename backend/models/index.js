import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

import User from './user.js';
import OAuthClient from './oauthclient.js';
import OAuthToken from './oauthtoken.js';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

User.init(sequelize);
OAuthClient.init(sequelize);
OAuthToken.init(sequelize);

// Si tu as des associations, tu peux les définir ici aussi, par exemple :
User.hasMany(OAuthToken);
OAuthToken.belongsTo(User);

export { sequelize, User, OAuthClient, OAuthToken };
