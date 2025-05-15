// sessionConfig.js
import session from 'express-session';
import dotenv from 'dotenv';
import logger from '../Utils/logger.js';
import { sequelize } from '../Config/database.js';
import SequelizeStore from 'connect-session-sequelize';
dotenv.config();

const SequelizeSessionStore = SequelizeStore(session.Store);

const sessionStore = new SequelizeSessionStore({
  db: sequelize,
  tableName: 'Sessions',
  checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 24 * 60 * 60 * 1000  
});

const sessionMiddleware = session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 
  }
});


sessionStore.sync();

export default sessionMiddleware;

