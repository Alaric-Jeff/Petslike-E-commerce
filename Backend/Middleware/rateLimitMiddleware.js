import rateLimit from 'express-rate-limit';
import logger from '../Utils/logger.js';

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 200, 
    alter: true,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json(options.message);
    }
});

export const cartOrderLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 20,
    alter: true,
    message: {
        success: false,
        message: 'Too many cart/order operations, please try again after 5 minutes'
    },
    handler: (req, res, next, options) => {
        logger.warn(`Cart/Order rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json(options.message);
    }
});

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5, 
    alter: true,
    message: {
        success: false,
        message: 'Too many login attempts, please try again after an hour'
    },
    handler: (req, res, next, options) => {
        logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json(options.message);
    }
});

export const signUpLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 3, 
    message: {
        success: false,
        message: 'Too many sign-up attempts, please try again after 24 hours'
    },
    handler: (req, res, next, options) => {
        logger.warn(`Sign-up rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json(options.message);
    }
}); 