import * as path from 'path'
import { Sequelize } from 'sequelize-typescript'
import databaseConfig from '@/config/database.json'

const env = process.env.NODE_ENV || "development"

const config = databaseConfig[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: 3306,
  pool: {
    max: 20,
    min: 1,
    acquire: 60000,
    idle: 10000,
  },
  models: [__dirname + '/../models/**/*.model.ts'],
  timezone: '+08:00'
});

export default sequelize;
