import { Sequelize } from 'sequelize';
import { PG_CONNECTION_STRING } from 'src/config';

export const pgClient = new Sequelize(PG_CONNECTION_STRING, {
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
