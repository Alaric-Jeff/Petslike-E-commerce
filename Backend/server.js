import express from "express";
import dotenv from "dotenv";
import logger from "./Utils/logger.js";
import { sequelize, initDatabase } from "./Config/database.js";
import initializeAssociation from "./Config/association.js";
import initializeTables from "./Config/initializeTables.js";
import initRoute from "./Routes/InitRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await initDatabase();
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  await initializeAssociation();
  await initializeTables();
  await initRoute(app);

  app.listen(process.env.HTTP_PORT, () => {
    logger.info(`Server is running on port ${process.env.HTTP_PORT}`);
  });
  
})();
