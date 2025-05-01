import express from "express"
import dotenv from "dotenv"
import logger  from "./Utils/logger.js";
import {sequelize, initDatabase} from "./Config/database.js";
import initializeAssociation from "./Config/association.js";
import initializeTables from "./Config/initializeTables.js";
dotenv.config()
const app = express();


await initDatabase();
await initializeAssociation();
await initializeTables();


app.listen(process.env.DB_PORT, ()=> {
    logger.info(`Server is running on port ${process.env.DB_PORT}`)
})