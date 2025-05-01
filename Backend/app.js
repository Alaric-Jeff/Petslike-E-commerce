import express from "express"
import dotenv from "dotenv"
import logger  from "./Utils/logger.js";
import sequelize from "./Config/database.js";

dotenv.config()
const app = express();

app.listen(process.env.DB_PORT, ()=> {
    logger.info(`Server is running on port ${process.env.DB_PORT}`)
})