import mysql from 'mysql2/promise';
import sequelizePkg from 'sequelize';
import dotenv from 'dotenv';
import logger from '../Utils/logger.js';

dotenv.config();

const { Sequelize } = sequelizePkg;

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.PORT,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    logger.info('Database checked/created successfully.');
    await connection.end();
  } catch (error) {
    logger.error('Error creating database:', error);
    throw error;
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT,
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

(async () => {
  try {
    await initDatabase();
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
})();

export default sequelize;
